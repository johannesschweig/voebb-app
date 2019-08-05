import { allLibraries, DONE, MOST_RELEVANT, NEWEST, TITLE_A_Z, TITLE_Z_A } from '../utils/constants.js'

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
    if (state.preview.data.hasOwnProperty('identifier')) {
      // check search results for title
      if (state.search.data.length) {
        r = state.search.data.filter(e => e.identifier === state.preview.data.identifier)
      }
      // check bookmarks for title
      if (r.length === 0 && state.bookmarks.data.length) {
        r = state.bookmarks.data.filter(e => e.identifier === state.preview.data.identifier)
        r = r[0].details['Titel']
      } else {
        r = r[0].title
      }
    }
    return r
  },
  // returns sorted list of bookmarks with data
  getSortedBookmarks: state => {
    return state.bookmarks.data.slice().sort((a, b) => {
      return a.availability.days - b.availability.days
    })
  },
  resultsAvailable: state => {
    return state.search.data.length !== 0 && state.search.loading.status === DONE
  },
  multipleResultsAvailable: state => {
    return state.search.data.length > 1 && state.search.loading.status === DONE
  },
  getSortedSearchData: state => {
    switch(state.search.sorting) {
      case MOST_RELEVANT: return state.search.data
      case NEWEST: return state.search.data.slice().sort((a, b) => {
        return b.year - a.year
      })
      case TITLE_A_Z: return state.search.data.slice().sort((a, b) => {
        return a.title.localeCompare(b.title)
      })
      case TITLE_Z_A: return state.search.data.slice().sort((a, b) => {
        return b.title.localeCompare(a.title)
      })
    }
  }

}
