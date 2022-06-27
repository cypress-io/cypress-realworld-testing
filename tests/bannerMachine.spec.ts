import { expect } from "chai"
import { interpret } from "xstate"
import { bannerMachine } from "../machines/bannerMachine"

describe("banner machine", () => {
  let bannerService

  beforeEach(() => {
    bannerService = interpret(bannerMachine)

    bannerService.start()
    expect(bannerService.state.value).to.equal("show")
  })

  it("can hide the banner", () => {
    const hideBannerEvent = {
      type: "HIDE_BANNER",
    }

    bannerService.send(hideBannerEvent)

    expect(bannerService.state.value).to.equal("hidden")
    expect(bannerService.state.context.displayBanner).to.be.false
  })
})
