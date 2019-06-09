import { allLibraries } from '../utils/constants.js'

export default {
  // returns a list with all the bookmarks identifiers
  bookmarksList: state => {
    return state.bookmarks.data.map(obj => obj.identifier)
  },
  // returns true if details are available for the bookmarks
  detailsAvailable: state => {
    // no bookmarks at all
    if (state.bookmarks.data.length === 0) {
      return false
      // bookmarks missing details
    } else if (!state.bookmarks.data[0].details) {
      return false
    } else {
      return true
    }
  },
  // returns a list of the availabilities from preferred libraries
  getPreferredLibraries: state => {
    if (state.libraries.length === 0) {
      return allLibraries
    } else {
      return state.libraries
    }
  },
  // get title of active card
  getActiveTitle: state => {
    var r = ''
    if (state.preview.hasOwnProperty('identifier')) {
      if (state.searchResults.length) {
        r = state.searchResults.filter(e => e.identifier === state.preview.identifier)
      }
      if (r.length === 0 && state.bookmarks.data.length) {
        r = state.bookmarks.data.filter(e => e.identifier === state.preview.identifier)
        r = r[0].details['Titel']
      } else {
        r = r[0].title
      }
    }
    return r
  }
}
