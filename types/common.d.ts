type LessonTableOfContents = {
  content: string
  slug: string
  lvl: number
  current?: boolean
}

interface ChallengeAnswer {
  id: string
  answeredCorrectly?: boolean
  skipped?: boolean
}
interface EventPayload {
  type: string
  id: string
  challengeIndex: number
}

interface MultipleChoicePayload extends EventPayload {
  userAnswerIndex: number
}

interface FreeFormPayload extends EventPayload {
  userAnswer: string
}
