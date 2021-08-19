import { expect } from "chai"
import { interpret } from "xstate"
import { progressMachine } from "../machines/progressMachine"
import * as machineUtils from "../utils/machineUtils"

const lessonPath =
  "testing-your-first-application/todomvc-app-install-and-overview"
const [sectionSlug, lessonSlug] = lessonPath.split("/")

describe("machine utils", () => {
  let progressService
  let learnData
  beforeEach(() => {
    progressService = interpret(progressMachine)
    progressService.start()
    learnData = progressService.state.context.learnData
  })

  it("getAllLessons() - returns all lessons from a section", () => {
    const lessons = machineUtils.getAllLessons(learnData, lessonPath)

    expect(lessons).to.equal(learnData[0].lessons)
  })

  it("findLesson() - returns a single lesson", () => {
    const lesson = machineUtils.findLesson(learnData, lessonPath)

    expect(lesson).to.equal(learnData[0].lessons[0])
  })

  it("getChallenge() - returns a single challenge", () => {
    const lesson = machineUtils.getChallenge(learnData, lessonPath, 0)

    expect(lesson).to.equal(learnData[0].lessons[0].challenges[0])
  })

  it("getLessonIndex() - returns the index of the lesson", () => {
    const lessonIndex = machineUtils.getLessonIndex(learnData, lessonPath)

    expect(lessonIndex).to.equal(
      learnData[0].lessons.indexOf(learnData[0].lessons[0])
    )
  })

  it("getSection() - returns the section", () => {
    const section = machineUtils.getSection(learnData, lessonPath)

    expect(section).to.equal(learnData[0])
  })

  it("getSectionIndex() - returns the index of the section", () => {
    const sectionIndex = machineUtils.getSectionIndex(learnData, lessonPath)

    expect(sectionIndex).to.equal(learnData.indexOf(learnData[0]))
  })

  it("isLessonCompleted() - returns the true when a lesson is complete", () => {
    const learnDataCopy = learnData
    const sectionIndex = machineUtils.getSectionIndex(learnData, lessonPath)
    const lessonIndex = machineUtils.getLessonIndex(learnData, lessonPath)
    learnDataCopy[sectionIndex].lessons[lessonIndex].status = "completed"

    const completedLesson = machineUtils.isLessonCompleted(
      learnDataCopy,
      lessonPath
    )

    expect(completedLesson).to.be.true
  })

  it("isLessonCompleted() - returns the false when a lesson is incomplete", () => {
    const learnDataCopy = learnData
    const sectionIndex = machineUtils.getSectionIndex(learnData, lessonPath)
    const lessonIndex = machineUtils.getLessonIndex(learnData, lessonPath)
    learnDataCopy[sectionIndex].lessons[lessonIndex].status = null

    const completedLesson = machineUtils.isLessonCompleted(
      learnDataCopy,
      lessonPath
    )

    expect(completedLesson).to.be.false
  })
})
