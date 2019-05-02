// mutations
export default {
    // adds a bookmark
    addBookmark (state, results) {
        state.bookmarks.data.push(results)
    },
    // removes a bookmark
    removeBookmark (state, identifier) {
        state.bookmarks.data = state.bookmarks.data.filter(b => b.identifier != identifier)
    },
    // sets the search results
    setSearchResults (state, results) {
        state.searchResults = results
    },
    // sets the preview data
    setPreviewData (state, results) {
        state.preview = results
    },
    // sets the current page
    setPage (state, page) {
        state.currentPage = page
    },
    setBookmarks (state, results) {
        state.bookmarks.data = results
    },
    // sets the last updated label to a new string
    setLastUpdated(state, dateString) {
        state.bookmarks.lastUpdated = dateString
    },
    // updates the store for preferred libraries
    setLibraries(state, libraries) {
        state.libraries = libraries
    }
}
