import Script from "next/script"

export default function SearchInput() {
  return (
    <>
      <section className="max-w-3xl mx-auto px-3">
        <div className="searchBoxContainer">
          <input
            type="text"
            id="searchBox"
            className="searchBox w-full px-2 py-1"
            placeholder="Search..."
            data-test="search-input"
          />
        </div>

        <div id="searchResults" className="searchResults lg:pl-8"></div>
      </section>

      <Script src="/scripts/search.js" strategy="afterInteractive" />
    </>
  )
}
