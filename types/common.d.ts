export interface Challenge {
  challengeType: string
  question: string
  answers: string[]
  correctAnswerIndex: number
}

export interface ChallengeAnswer {
  id: string
  answeredCorrectly?: boolean
  skipped?: boolean
}

export type Course = {
  title: string
  slug: string
  description: string
  image: string
  learnFeatures: string[]
  lessons: Lessons[]
}

export interface EventPayload {
  type: string
  id: string
  challengeIndex: number
}

export type Lesson = {
  title: string
  description: string
  slug: string
  challenges?: Challenge[]
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
}
