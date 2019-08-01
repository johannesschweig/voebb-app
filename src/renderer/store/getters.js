import { allLibraries, DONE, MOST_RELEVANT, NEWEST, TITLE_A_Z, TITLE_Z_A, AVAILABLE } from '../utils/constants.js'
import { extractYear } from '../utils/string.js'

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
  resultsAvailable: state => {
    return state.search.data.length !== 0 && state.search.loading.status === DONE
  },
  multipleResultsAvailable: state => {
    return state.search.data.length > 1 && state.search.loading.status === DONE
  },
  getSortedSearchData: state => {
    switch (state.search.sorting) {
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
  },
  multipleBookmarksAvailable: state => {
    return state.bookmarks.data.length > 1 && state.bookmarks.loading.status === DONE
  },
  getSortedBookmarksData: state => {
    // sorts available to front
    function adjustDays (avail) {
      if (avail.message === 'available') {
        return -Number.MAX_SAFE_INTEGER
      }
      return avail.days
    }

    switch (state.bookmarks.sorting) {
      // sort available (0 days) > days due (-x days) > days left (x days) > not available (INF days)
      case AVAILABLE: return state.bookmarks.data.slice().sort((a, b) => {
        return adjustDays(a.availability) - adjustDays(b.availability)
      })
      case TITLE_A_Z: return state.bookmarks.data.slice().sort((a, b) => {
        return a.details['Titel'].localeCompare(b.details['Titel'])
      })
      case TITLE_Z_A: return state.bookmarks.data.slice().sort((a, b) => {
        return b.details['Titel'].localeCompare(a.details['Titel'])
      })
      case NEWEST: return state.bookmarks.data.slice().sort((a, b) => {
        return extractYear(b.details['Veröffentlichung']) - extractYear(a.details['Veröffentlichung'])
      })
    }
  },
  getSortedSearchIdentifiers: (_state, getters) => {
    return getters.getSortedSearchData.map(e => e.identifier)
  },
  getSortedBookmarksIdentifiers: (_state, getters) => {
    return getters.getSortedBookmarksData.map(e => e.identifier)
  }
}
