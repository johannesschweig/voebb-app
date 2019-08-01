import { INITIAL } from '../utils/constants.js'

// mutations
export default {
  // adds a bookmark
  addBookmark (state, results) {
    state.bookmarks.data.push(results)
  },
  // removes a bookmark
  removeBookmark (state, identifier) {
    state.bookmarks.data = state.bookmarks.data.filter(b => b.identifier !== identifier)
  },
  // sets the search results
  setSearchResults (state, results) {
    state.searchResults = results
  },
  // clear search results
  clearSearchResults (state) {
    state.searchResults = []
  },
  // sets the preview data
  setPreviewData (state, results) {
    state.preview = results
  },
  // clear the preview data
  clearPreviewData (state) {
    state.preview = {
      details: [],
      copies: [],
      availability: {}
    }
    // reset loading status
    state.loading.preview.status = INITIAL
  },
  setBookmarks (state, results) {
    state.bookmarks.data = results
  },
  // sets the last updated label to a new string
  setLastUpdated (state, dateString) {
    state.bookmarks.lastUpdated = dateString
  },
  // updates the store for preferred libraries
  setLibraries (state, libraries) {
    state.libraries = libraries
  },
  //
  setLoading (state, payload) {
    state.loading[payload.component] = payload.data
  }
}
