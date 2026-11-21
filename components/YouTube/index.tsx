import { useEffect, useRef } from "react"
import s from "./style.module.css"
import { YouTubeProps } from "./types"
import { createVideoTracker } from "../../utils/fullstory"

// youtube-nocookie.com doesn't set YouTube's cookies until the visitor plays the
// video. enablejsapi lets the IFrame Player API below read playback state.
const embedUrl = (id: string) =>
  `https://www.youtube-nocookie.com/embed/${id}?enablejsapi=1`

// The IFrame Player API's states (YT.PlayerState).
const PLAYING = 1
const ENDED = 0

const PROGRESS_POLL_MS = 1000

type Player = {
  getCurrentTime: () => number
  getDuration: () => number
}

type YouTubeGlobal = {
  Player: new (
    element: HTMLIFrameElement,
    options: { events: { onStateChange: (event: { data: number }) => void } }
  ) => Player
}

declare global {
  interface Window {
    YT?: YouTubeGlobal
    onYouTubeIframeAPIReady?: () => void
  }
}

let apiReady: Promise<YouTubeGlobal> | undefined

// Loads https://www.youtube.com/iframe_api once for every video on the page.
function loadYouTubeApi(): Promise<YouTubeGlobal> {
  if (window.YT?.Player) return Promise.resolve(window.YT)
  if (!apiReady) {
    apiReady = new Promise((resolve) => {
      const previous = window.onYouTubeIframeAPIReady
      window.onYouTubeIframeAPIReady = () => {
        previous?.()
        resolve(window.YT)
      }
      const script = document.createElement("script")
      script.src = "https://www.youtube.com/iframe_api"
      script.async = true
      document.head.appendChild(script)
    })
  }
  return apiReady
}

export default function YouTube({ id, title }: YouTubeProps) {
  const iframe = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    // The player API is only here for FullStory, so it isn't loaded when
    // FullStory isn't (dev builds, no org ID, an ad blocker).
    if (typeof window.FS !== "function" || !iframe.current) return
    const tracker = createVideoTracker(id)
    let active = true
    let poll: ReturnType<typeof setInterval> | undefined
    const stopPolling = () => {
      if (poll) clearInterval(poll)
      poll = undefined
    }

    loadYouTubeApi().then((YT) => {
      if (!active || !iframe.current || !YT?.Player) return
      const player = new YT.Player(iframe.current, {
        events: {
          onStateChange: ({ data }) => {
            if (!active) return
            const check = () =>
              tracker.progressed(player.getCurrentTime(), player.getDuration())
            if (data === PLAYING) {
              tracker.played()
              check()
              stopPolling()
              poll = setInterval(check, PROGRESS_POLL_MS)
            } else {
              stopPolling()
              if (data === ENDED) {
                check()
                tracker.ended()
              }
            }
          },
        },
      })
    })

    return () => {
      active = false
      stopPolling()
    }
  }, [id])

  return (
    <div className={s.embedContainer}>
      <iframe
        ref={iframe}
        width="560"
        height="315"
        src={embedUrl(id)}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  )
}
