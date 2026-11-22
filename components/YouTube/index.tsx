import { useEffect, useRef } from "react"
import s from "./style.module.css"
import { YouTubeProps } from "./types"
import { createVideoTracker, isFullStoryCapturing } from "../../utils/fullstory"

// The plain embed, unchanged from before FullStory. The IFrame Player API needs
// enablejsapi=1, and with it the player posts messages to this page, so it's only
// switched on once FullStory is recording (attach() below), with an explicit
// origin so those messages aren't sent to "*".
const embedUrl = (id: string) => `https://www.youtube.com/embed/${id}`

const apiEmbedUrl = (id: string) =>
  `${embedUrl(id)}?enablejsapi=1&origin=${encodeURIComponent(
    window.location.origin
  )}`

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
    Osano?: {
      cm?: {
        addEventListener?: (event: string, callback: () => void) => void
      }
    }
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

// Videos waiting for consent. One Osano listener serves every video on the
// site, so mounting and unmounting videos during client-side navigation doesn't
// pile up listeners that are never removed.
const waitingForConsent = new Set<() => void>()
let consentListenerAdded = false

function onConsent(attach: () => void): () => void {
  waitingForConsent.add(attach)
  if (!consentListenerAdded && window.Osano?.cm?.addEventListener) {
    consentListenerAdded = true
    // The consent gate's own listener runs first, since it's registered in <head>.
    window.Osano.cm.addEventListener("osano-cm-consent-saved", () =>
      waitingForConsent.forEach((callback) => callback())
    )
  }
  return () => waitingForConsent.delete(attach)
}

export default function YouTube({ id, title }: YouTubeProps) {
  const iframe = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    // The player API is only here for FullStory, so it loads only once FullStory
    // is recording: never in dev builds, without an org ID, behind an ad blocker,
    // or before the visitor accepts Analytics cookies.
    if (!iframe.current) return
    const tracker = createVideoTracker(id)
    let active = true
    let attached = false
    let poll: ReturnType<typeof setInterval> | undefined
    const stopPolling = () => {
      if (poll) clearInterval(poll)
      poll = undefined
    }

    const attach = () => {
      if (attached || !active || !isFullStoryCapturing()) return
      attached = true
      waitingForConsent.delete(attach)
      const frame = iframe.current
      if (!frame) return
      // Reloads the embed with the player API on. Consent normally comes before
      // anyone presses play, so this rarely interrupts a video. The player is
      // built only once the reloaded embed has loaded: when the API script is
      // already on the page (a second video, or client-side navigation from
      // another lesson), it resolves at once and would otherwise wrap the old
      // embed, which has no API to answer it.
      const reloaded = new Promise<void>((resolve) =>
        frame.addEventListener("load", () => resolve(), { once: true })
      )
      frame.src = apiEmbedUrl(id)
      Promise.all([loadYouTubeApi(), reloaded]).then(([YT]) => {
        if (!active || !iframe.current || !YT?.Player) return
        const player = new YT.Player(iframe.current, {
          events: {
            onStateChange: ({ data }) => {
              if (!active) return
              const check = () =>
                tracker.progressed(
                  player.getCurrentTime(),
                  player.getDuration()
                )
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
    }

    attach()
    // Accepting cookies later on this page starts tracking from then on.
    const stopWaiting = attached ? () => {} : onConsent(attach)

    return () => {
      active = false
      stopPolling()
      stopWaiting()
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
