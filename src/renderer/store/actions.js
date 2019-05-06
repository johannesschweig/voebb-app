import { search, getEntryDetails } from '../utils/requests.js'
import { getCurrentDateString } from '../utils/string.js'
import { getUserData, setUserData } from '../utils/userStorage.js'
import { INITIAL, LOADING, TOO_MANY_HITS, NO_HITS, DONE } from '../utils/constants.js'
import { getLoadingObject } from '../utils/utils.js'

// actions
export default {
    // read user data (bookmarks, preferred libraries)
    readUserData ({ commit }) {
        // read libraries
        getUserData('libraries').then(data => {
            if (Object.keys(data).length == 0) {
                throw new Error('handled')
            }
            console.log('Fetched user data for key', 'libraries', data.length, 'entries')
            commit('setLibraries', data)
        }).catch(error => {
            console.log('Libraries user file not available')
        })
        // read bookmarks
        getUserData('bookmarks').then(data => {
            commit('setLoading', getLoadingObject('bookmarks', LOADING))
            // no bookmarks
            if (Object.keys(data).length == 0) {
                throw new Error('handled')
            }
            console.log('Fetched user data for key', 'bookmarks', data.length, 'entries')
            // fetch all bookmarks details, availability
            let promises = []
            data.map(bookmark => {
                promises.push(getEntryDetails(bookmark))
            })
            return Promise.all(promises)
        }).then(res => {
            commit('setLoading', getLoadingObject('bookmarks', DONE))
            commit('setBookmarks', res)
            commit('setLastUpdated', getCurrentDateString())
        }).catch(error => {
            commit('setLoading', getLoadingObject('bookmarks', DONE, 'You have not added any bookmarks yet.'))
            console.log('Bookmarks user file not available')
        })
    },
    // toggles a bookmark: removes or adds it
    // active: if the bookmark is active or not
    // identifier: of the instance
    toggleBookmark ({ commit, dispatch, getters }, payload) {
        if (payload.active) {
             dispatch('removeBookmark', payload.identifier)
        } else {
            // fetch all bookmarks details, availability
            commit('setLoading', getLoadingObject('bookmarks', LOADING))
            getEntryDetails(payload.identifier)
                .then(res => {
                    let bookmarks = getters.bookmarksList.concat([payload.identifier])
                    // update user storage
                    setUserData('bookmarks', bookmarks)
                    commit('addBookmark', res)
                    commit('setLastUpdated', getCurrentDateString())
                    commit('setLoading', getLoadingObject('bookmarks', DONE))
                    console.log('Added bookmark', payload.identifier)
                })
        }
    },
    // fake search for testing purposes
    fakeSearch ({ commit }) {
        // clear search results and preview data
        commit('clearSearchResults')
        commit('clearPreviewData')
        // prepare loading objects
        let loading = getLoadingObject('searchResults', LOADING)
        commit('setLoading', loading)
        let done = getLoadingObject('searchResults', DONE)
        search('', true).then(res => {
            commit('setLoading', done)
            commit('setSearchResults', res)
        })
    },
    // search for term
    search({ commit }, term) {
        // clear search results and preview data
        commit('clearSearchResults')
        commit('clearPreviewData')
        // prepare loading objects
        let loading = getLoadingObject('searchResults', LOADING)
        commit('setLoading', loading)
        let done = getLoadingObject('searchResults')

        // start search
        search(term, false).then(res => {
            // check result and update loading state
            if (typeof res == 'string') {
                done.data.status = res
                if (res == NO_HITS) { // no hits
                    done.data.msg = `Sorry! We can\'t find anything for "${term}"`
                } else if (res == TOO_MANY_HITS) { // too many hits
                    done.data.msg  = `There were too many hits for "${term}". Try adjusting your search.`
                }
            } else { // all fine
                done.data.status = DONE
            }
            commit('setLoading', done)
            // reset preview
            commit('setPreviewData', { details: [], availability: [] })
            commit('setSearchResults', res)
        })
    },
    // fetch details data on instance
    fetchDetails({ commit }, identifier) {
        // clear preview data
        commit('clearPreviewData')
        // prepare loading objects
        let loading = getLoadingObject('preview', LOADING)
        commit('setLoading', loading)
        let done = getLoadingObject('preview', DONE)
        // fetch details
        getEntryDetails(identifier).then(res => {
            commit('setLoading', done)
            commit('setPreviewData', res)
        })
    },
    // fake fetch details for testing purposes
    fakeFetchDetails({ commit }) {
        // clear preview data
        commit('clearPreviewData')
        // prepare loading objects
        let loading = getLoadingObject('preview', LOADING)
        commit('setLoading', loading)
        let done = getLoadingObject('preview', DONE)
        // fetch details
        getEntryDetails('', true).then(res => {
            commit('setLoading', done)
            commit('setPreviewData', res)
        })
    },
    // switch page from search to bookmarks
    switchPage({ state, commit }, page) {
        if (state.currentPage != page) {
            commit('setPage', page)
        }
    },
   // removes bookmark
   removeBookmark({ commit, getters }, identifier) {
        // update bookmarks file
        let bookmarks = getters.bookmarksList.filter(b => b != identifier)
        // check if last bookmark
        if (bookmarks.length == 0) {
            commit('setLoading', getLoadingObject('bookmarks', INITIAL, 'You have not added any bookmarks yet.'))
        }
        // update user storage
        setUserData('bookmarks', bookmarks)
        commit('removeBookmark', identifier)
        console.log('Removed bookmark', identifier)
   },
   // updates the store and user settings for preferred libraries
   setLibraries({ commit }, libraries) {
       console.log('Updating libraries', libraries.length, 'entries')
       setUserData('libraries', libraries)
       commit('setLibraries', libraries)
   }
}
