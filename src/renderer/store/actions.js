import { search, getEntryDetails } from '../utils/requests.js'
import { getCurrentDateString, getAvailability } from '../utils/string.js'
import { getUserData, setUserData } from '../utils/userStorage.js'
import { INITIAL, LOADING, TOO_MANY_HITS, NO_HITS, DONE, SEARCH, BOOKMARKS, PREVIEW } from '../utils/constants.js'
import { getLoadingObject, CustomError } from '../utils/utils.js'

// actions
export default {
  // read user data (bookmarks, preferred libraries)
  readUserData ({ commit, getters }) {
    // read libraries
    getUserData('libraries').then(data => {
      if (Object.keys(data).length === 0) {
        throw new Error('handled')
      }
      console.log('Fetched user data for key', 'libraries', data.length, 'entries')
      commit('setLibraries', data)
    }).catch(() => {
      console.log('Libraries user file not available')
    })
    // read bookmarks
    getUserData('bookmarks').then(data => {
      commit('setLoading', getLoadingObject(BOOKMARKS, LOADING))
      // no bookmarks
      if (Object.keys(data).length === 0) {
        throw new CustomError('Bookmarks file missing')
      }
      console.log('Fetched user data for key', 'bookmarks', data.length, 'entries')
      // fetch all bookmarks details, copies, availability
      let promises = []
      data.map(bookmark => {
        promises.push(getEntryDetails(bookmark))
      })
      return Promise.all(promises)
    }).then(res => {
      commit('setLoading', getLoadingObject(BOOKMARKS, DONE))
      // get availability
      let results = res.map(result => ({
        ...result,
        availability: getAvailability(result.copies, getters.getPreferredLibraries)
      }))
      commit('setBookmarksData', results)
      commit('setLastUpdated', getCurrentDateString())
    }).catch(err => {
      if (err instanceof CustomError) {
        switch (err.message) {
          case 'Bookmarks file missing':
            commit('setLoading', getLoadingObject(BOOKMARKS, DONE, 'You have not added any bookmarks yet'))
            console.log('Bookmarks user file not available')
            break
          case 'Request timeout':
            commit('setLoading', getLoadingObject(BOOKMARKS, DONE, 'Request timed out. Retry again.'))
            console.log('Request timeout')
            break
        }
      } else {
        console.log('Error detected')
        throw err
      }
    })
  },
  // toggles a bookmark: removes or adds it
  // active: if the bookmark icon is filled or not
  // identifier: of the instance
  toggleBookmark ({ commit, dispatch, getters }, payload) {
    if (payload.active) {
      dispatch('removeBookmark', payload.identifier)
    } else if (getters.bookmarksList.indexOf(payload.identifier) === -1) {
      // fetch all bookmarks details, availability
      commit('setLoading', getLoadingObject(BOOKMARKS, LOADING))
      getEntryDetails(payload.identifier)
        .then(res => {
          let bookmarks = getters.bookmarksList.concat([payload.identifier])
          // update user storage
          setUserData('bookmarks', bookmarks)
          // get availability
          let results = {
            ...res,
            availability: getAvailability(res.copies, getters.getPreferredLibraries)
          }
          commit('addBookmark', results)
          commit('setLastUpdated', getCurrentDateString())
          commit('setLoading', getLoadingObject(BOOKMARKS, DONE))
          console.log('Added bookmark', payload.identifier)
        })
    } else {
      console.log('Bookmark already in the list of bookmarks.')
    }
  },
  // fake search for testing purposes
  fakeSearch ({ commit }) {
    // clear search results and preview data
    commit('clearSearchResultsData')
    commit('clearPreviewData')
    commit('resetSorting', SEARCH)
    // prepare loading objects
    let loading = getLoadingObject(SEARCH, LOADING)
    commit('setLoading', loading)
    let done = getLoadingObject(SEARCH, DONE)
    search('', true).then(res => {
      commit('setLoading', done)
      commit('setSearchResultsData', res)
    })
  },
  // search for term
  search ({ commit }, term) {
    // clear search results and preview data
    commit('clearSearchResultsData')
    commit('clearPreviewData')
    commit('resetSorting', SEARCH)
    // prepare loading objects
    let loading = getLoadingObject(SEARCH, LOADING)
    commit('setLoading', loading)
    let done = getLoadingObject(SEARCH)

    // start search
    search(term, false).then(res => {
      // check result and update loading state
      if (typeof res === 'string') {
        done.data.status = res
        if (res === NO_HITS) { // no hits
          done.data.msg = `Sorry! We can't find anything for "${term}"`
        } else if (res === TOO_MANY_HITS) { // too many hits
          done.data.msg = `There were too many hits for "${term}". Try adjusting your search.`
        }
      } else { // all fine
        done.data.status = DONE
      }
      commit('setLoading', done)
      // reset preview
      commit('setPreviewData', { details: [], availability: [] })
      commit('setSearchResultsData', res)
    })
  },
  // fetch details data on instance
  fetchDetails ({ commit }, identifier) {
    // clear preview data
    commit('clearPreviewData')
    // prepare loading objects
    let loading = getLoadingObject(PREVIEW, LOADING)
    commit('setLoading', loading)
    let done = getLoadingObject(PREVIEW, DONE)
    // fetch details
    getEntryDetails(identifier).then(res => {
      commit('setLoading', done)
      commit('setPreviewData', res)
    })
  },
  // fake fetch details for testing purposes
  fakeFetchDetails ({ commit }) {
    // clear preview data
    commit('clearPreviewData')
    // prepare loading objects
    let loading = getLoadingObject(PREVIEW, LOADING)
    commit('setLoading', loading)
    let done = getLoadingObject(PREVIEW, DONE)
    // fetch details
    getEntryDetails('', true).then(res => {
      commit('setLoading', done)
      commit('setPreviewData', res)
    })
  },
  // removes bookmark
  removeBookmark ({ commit, getters }, identifier) {
    // update bookmarks file
    let bookmarks = getters.bookmarksList.filter(b => b !== identifier)
    // check if last bookmark
    if (bookmarks.length === 0) {
      commit('setLoading', getLoadingObject(BOOKMARKS, INITIAL, 'You have not added any bookmarks yet.'))
    }
    // update user storage
    setUserData('bookmarks', bookmarks)
    commit('removeBookmark', identifier)
    console.log('Removed bookmark', identifier)
  },
  // updates the store and user settings for preferred libraries
  setLibraries ({ commit }, libraries) {
    console.log('Updating libraries', libraries.length, 'entries')
    setUserData('libraries', libraries)
    commit('setLibraries', libraries)
  },
  // sorts the sorting criterion for a list of results
  // page: the page to sort (search or bookmarks)
  // criterion: which sorting criterion to apply
  setSorting ({ commit }, payload) {
    commit('setSorting', payload)
  }
}
