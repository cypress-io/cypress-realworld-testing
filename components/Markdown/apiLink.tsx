import { fsLabel } from "../../utils/fullstory"

type Props = {
  apiName: string
  displayName: string
}

export default function apiLink({ apiName, displayName }: Props) {
  return (
    <a
      href={`https://docs.cypress.io/api/commands/${apiName}`}
      target="_blank"
      rel="noreferrer"
      {...fsLabel("Learn Content - API Docs Link", { "api-name": apiName })}
    >
      {displayName}
    </a>
  )
}
