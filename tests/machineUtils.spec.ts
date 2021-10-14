import { expect } from "chai"
import { interpret } from "xstate"
import { progressMachine } from "../machines/progressMachine"
import * as machineUtils from "../utils/machineUtils"
import learnJson from "../learn.json"

const lessonPath = "cypress-fundamentals/cypress-runs-in-the-browser"

const [sectionSlug, lessonSlug] = lessonPath.split("/")

describe("machine utils", () => {
  let progressService

  beforeEach(() => {
    progressService = interpret(progressMachine)
    progressService.start()
  })

  it("getAllLessons() - returns all lessons from a section", () => {
    const lessons = machineUtils.getAllLessons(learnJson, lessonPath)

    expect(lessons).to.equal(learnJson[sectionSlug].lessons)
  })

  it("findLesson() - returns a single lesson", () => {
    const lesson = machineUtils.findLesson(learnJson, lessonPath)

    expect(lesson).to.equal(learnJson[sectionSlug].lessons[0])
  })

  it("getChallenge() - returns a single challenge", () => {
    const lesson = machineUtils.getChallenge(learnJson, lessonPath, 0)

    expect(lesson).to.equal(learnJson[sectionSlug].lessons[0].challenges[0])
  })

  it("getLessonIndex() - returns the index of the lesson", () => {
    const lessonIndex = machineUtils.getLessonIndex(learnJson, lessonPath)

    expect(lessonIndex).to.equal(
      learnJson[sectionSlug].lessons.indexOf(learnJson[sectionSlug].lessons[0])
    )
  })

  it("getSection() - returns the section", () => {
    const section = machineUtils.getSection(learnJson, lessonPath)

    expect(section).to.equal(learnJson[sectionSlug])
  })

  it("isLessonCompleted() - returns true when a lesson is complete", () => {
    const answerEvent = {
      type: "SUBMIT_ANSWER",
      id: "cypress-fundamentals/cypress-runs-in-the-browser",
      challengeIndex: 0,
      userAnswerIndex: 0,
    }
    progressService.send(answerEvent)

    expect(machineUtils.isLessonCompleted(progressService, lessonPath)).to.be
      .true
  })

  it("isLessonCompleted() - returns false when a lesson is incomplete", () => {
    const answerEvent = {
      type: "SUBMIT_ANSWER",
      id: "cypress-fundamentals/cypress-runs-in-the-browser",
      challengeIndex: 0,
      userAnswerIndex: 1,
    }
    progressService.send(answerEvent)

    expect(machineUtils.isLessonCompleted(progressService, lessonPath)).to.be
      .false
  })
})
