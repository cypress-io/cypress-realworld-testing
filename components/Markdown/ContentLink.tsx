import { contentLinkLabel, fsLabel } from "../../utils/fullstory"

// Every Markdown link in lesson content. Links toward docs.cypress.io and
// www.cypress.io get a FullStory label, so one funnel can follow a learner from
// a lesson to the docs and on to Cypress Cloud. Other links render unchanged.
export default function ContentLink(props) {
  const label = contentLinkLabel(props.href)
  return <a {...props} {...(label ? fsLabel(label) : {})} />
}
