import { DocSearch } from "@docsearch/react"
import "@docsearch/css"
import { SEARCH_INDEX, trackSearchClient } from "../utils/fullstory"

export default function Search() {
  return (
    <DocSearch
      appId={process.env.NEXT_PUBLIC_ALGOLIA_APP_ID}
      apiKey={process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY}
      indexName={SEARCH_INDEX}
      disableUserPersonalization={true}
      transformSearchClient={trackSearchClient}
    />
  )
}
