# AGENTS.md

learn.cypress.io: a Next.js 12 site (pages router, SSG). Before committing, run `yarn types`, `yarn lint`, and `yarn test:unit`; e2e specs in `cypress/e2e` run against `yarn build && yarn start`.

## FullStory

learn.cypress.io records into the same FullStory org as docs.cypress.io, www.cypress.io, and Cypress Cloud. Follow their conventions (`cypress-documentation/src/utils/fullstory.ts`, `cypress.io/.agents/architecture/fullstory.md`) so one funnel works across all of them.

- **Loading:** `pages/_document.js` renders the snippet and consent gate from `utils/fullstorySnippet.ts`, only in production builds with `FULLSTORY_ORG_ID` set. The value is read at build time, so set it where `next build` runs. Without it, nothing loads.
- **Consent:** Osano (`osano.js`) must stay the **first** script in `_document.js`'s `<Head>`, synchronous, on every page. Capture starts only after Analytics consent and stops if it's withdrawn. Don't move Osano into a page's `next/head`, and don't make it `async` or `defer`.
- **Events:** call `trackFullStoryEvent()` from `utils/fullstory.ts`, never `window.FS` directly. Add each event to the typed `FullStoryEvents` registry first. Use `trackFullStoryEventBeforeNavigating()` when the next thing that happens is a full page load.
  - Names are Title Case "Object Action" in the past tense (`Lesson Completed`). Never rename one: FullStory keys funnels on the exact name.
  - Properties are camelCase ids, counts, booleans, and fixed labels. No free text or PII, and no query strings (use `currentPagePath()`).
  - Fire on the confirmed outcome (a resolved clipboard write, saved progress), not on the click that started it.
- **Page properties:** `_app.tsx` sends `pageName`, `pageType: "learn"`, `product: "app"`, `section`, and `courseSlug` for lessons. A new route lands in `other` until it gets a row in `ROUTES` in `utils/fullstory.ts`.
- **Click labels:** spread `fsLabel(name, properties?)` from `utils/fullstory.ts` onto anything clickable worth naming. Names follow "Surface - Sub-scope - Action" with a `Learn` surface prefix (`Learn Header - Logo`, `Learn Home - Course Card`). Keep names to a fixed set and put ids in `properties` (`{ "course-slug": slug }`), not in the name. Shared names like `Cookie Consent - …` stay as they are. `styles/global.css` turns off pointer events inside labeled links and buttons, so clicks on nested `<span>`/`<svg>` count for the label.
- **Content links:** MDX `a` renders `components/Markdown/ContentLink.tsx`, which labels links toward docs.cypress.io, on.cypress.io, and www.cypress.io. `apiLink` adds `api-name`.
- **Video:** `components/YouTube` embeds from `youtube-nocookie.com` and, only when FullStory is loaded, uses YouTube's IFrame Player API to send `Video Started`, `Video Progressed` (25/50/75), and `Video Completed`, once each per page view.
- **Privacy:** the org records in Full capture mode. Put `fs-exclude` on any element showing free text or PII, and `fs-mask` on inputs whose interactions should stay but whose values shouldn't (the DocSearch input is masked by `maskSearchInput()`).
- **Tests:** `tests/fullstory.spec.ts` covers page properties and the consent gate, and `cypress/e2e/fullstory.cy.ts` checks each event against a stubbed `window.FS`. `cypress.config.ts` blocks `*fullstory.com` so test runs don't create real sessions. Update both when you add an event or a route.
