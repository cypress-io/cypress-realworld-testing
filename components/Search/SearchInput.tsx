export default function SearchInput() {
  return (
    <>
      <section className="max-w-3xl mx-auto px-3">
        <div className="searchBoxContainer">
          <input
            type="text"
            id="searchBox"
            className="block w-full bg-white bg-opacity-20 py-2 pl-10 pr-3 border rounded-md leading-5 text-gray-900 focus:outline-none focus:bg-opacity-100 focus:placeholder-gray-500 focus:ring-0 sm:text-sm"
            placeholder="Search..."
            data-test="search-input"
          />
        </div>

        <div id="searchResults" className="searchResults lg:pl-8"></div>
      </section>
    </>
  )
}
