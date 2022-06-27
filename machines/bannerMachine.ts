import { createMachine, assign } from "xstate"

const defaultContext = {
  displayBanner: true,
}

export const bannerMachine = createMachine(
  {
    id: "banner",
    initial: "show",
    context: defaultContext,
    states: {
      show: {
        on: {
          HIDE_BANNER: { target: "hidden", actions: ["hideBanner"] },
        },
      },
      hidden: {
        on: {},
      },
    },
  },
  {
    actions: {
      hideBanner: assign((context: any, event: any) => ({
        displayBanner: false,
      })),
    },
  }
)
