import algoliasearch from "algoliasearch"
import searchIndex from "../public/search-index.json"
require("dotenv").config()

const client = algoliasearch("8V1MWQUQBN", process.env.ALGOLIA_ADMIN_KEY)

const index = client.initIndex("real_world_testing")

index.saveObjects(searchIndex, {
  autoGenerateObjectIDIfNotExist: true,
})
