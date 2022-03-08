# Scripts

## search/create-search-index.js

Generates the search index for Algolia.

## brokenLinks.ts

Checks for broken links in the real world testing app.

## generateContentFiles.ts

This script was used primarily during the early stages of development of the app to render some markdown files with dummy data for the courses content.

## generateRealWorldExamples.ts

This script was used primarily during the early stages of development of the app to render some markdown files with dummy data for the real world examples content.

## updateAlgoliaIndex.ts

Updates the Algolia search index created by `search/create-search-index.js` with the latest content.

## updateSlugs.ts

This script takes all of the titles from the lesson in `learn.json` and 'slugify's' them to populate the `slug:` property.

## updateRWESlugs.ts

This script takes all of the titles from the lesson in `real-world-examples.json` and 'slugify's' them to populate the `slug:` property.
