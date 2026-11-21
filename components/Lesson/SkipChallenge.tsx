import { useActor } from "@xstate/react"
import { trackFullStoryEvent } from "../../utils/fullstory"

type Props = {
  progressService: any
}

export default function LessonChallenge({ progressService }: Props) {
  const [, progressSend] = useActor(progressService)

  const handleInputChange = (event) => {
    const target = event.target
    const value = target.type === "checkbox" ? target.checked : target.value

    progressSend({
      type: "DISABLE_CHALLENGES",
      value,
    })
    trackFullStoryEvent(
      value ? "Challenges Disabled" : "Challenges Enabled",
      {}
    )
  }

  return (
    <>
      <hr />
      <div className="flex items-center justify-center py-6">
        <input
          id="skip-challenge"
          data-test="skip-challenge-input"
          name="answer"
          type="checkbox"
          className="h-4 w-4 rounded border-gray-300 text-gray-500 focus:ring-indigo-500"
          checked={progressService.state.context.disableChallenges}
          onChange={handleInputChange}
        />
        <label
          htmlFor="skip-challenge"
          className="ml-4 leading-6 text-gray-700"
        >
          Disable questions on upcoming lessons
        </label>
      </div>
    </>
  )
}
