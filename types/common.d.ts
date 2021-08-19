export interface Challenge {
  challengeType: string
  question: string
}

export interface ChallengeAnswer {
  id: string
  answeredCorrectly?: boolean
  skipped?: boolean
}

export interface EventPayload {
  type: string
  id: string
  challengeIndex: number
}

export interface FreeFormChallenge extends Challenge {
  answer: string
  hint: string
}

export interface FreeFormPayload extends EventPayload {
  userAnswer: string
}

export interface Lesson {
  title: string
  slug: string
  description: string
  videoURL: string
  status: string | null
  challenges: object[]
}

export type LessonTableOfContents = {
  content: string
  slug: string
  lvl: number
  current?: boolean
}

export interface MultipleChoiceChallenge extends Challenge {
  answers: []
  correctAnswerIndex: string
}

export interface MultipleChoicePayload extends EventPayload {
  userAnswerIndex: number
}

export interface ProgressContext {
  sectionsCompleted: string[]
  lessons: object[]
  disableChallenges: boolean
  learnData: object[]
}
