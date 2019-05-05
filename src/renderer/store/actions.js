import { search, getEntryDetails } from '../utils/requests.js'
import { getCurrentDateString } from '../utils/string.js'
import { getUserData, setUserData } from '../utils/userStorage.js'

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
            commit('setBookmarks', res)
            commit('setLastUpdated', getCurrentDateString())
        }).catch(error => {
            console.log('Bookmarks user file not available')
        })
    },
    // toggles a bookmark: removes or adds it
    // active: if the bookmark is active or not
    // identifier: of the instance
    toggleBookmark ({ commit, getters }, payload) {
        if (payload.active) {
            // update bookmarks file
            let bookmarks = getters.bookmarksList.filter(b => b != payload.identifier)
            // update user storage
            setUserData('bookmarks', bookmarks)
            commit('removeBookmark', payload.identifier)
        } else {
            // fetch all bookmarks details, availability
            getEntryDetails(payload.identifier)
                .then(res => {
                    let bookmarks = getters.bookmarksList.concat([payload.identifier])
                    // update user storage
                    setUserData('bookmarks', bookmarks)
                    commit('addBookmark', res)
                })
        }
    },
    // fake search for testing purposes
    fakeSearch ({ commit }) {
        search('', true).then(res => {
            commit('setSearchResults', res)
        })
    },
    // search for term
    search({ commit }, term) {
        let loading = {
            component: 'searchResults',
            data: {
                status: 'loading',
                msg: ''
            }
        }
        let done = {
            component: 'searchResults',
            data: {
                status: '',
                msg: ''
            }
        }
        commit('setLoading', loading)
        search(term, false).then(res => {
            if (res.length == 0) {
                done.data.status = 'returnedEmpty',
                done.data.msg = `Oops! We can\'t find anything for "${term}"`
            } else {
                done.data.status = 'done'
            }
            commit('setLoading', done)
            // reset preview
            commit('setPreviewData', { details: [], availability: [] })
            commit('setSearchResults', res)
        })
    },
    // fetch details data on instance
    fetchDetails({ commit }, identifier) {
        getEntryDetails(identifier).then(res => {
            commit('setPreviewData', res)
        })
    },
    // fake fetch details for testing purposes
    fakeFetchDetails({ commit }) {
        getEntryDetails('', true).then(res => {
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
        // update user storage
        let bookmarks = getters.bookmarksList.filter(b => b != identifier)
        setUserData('bookmarks', bookmarks)
        commit('removeBookmark', identifier)
   },
   // updates the store and user settings for preferred libraries
   setLibraries({ commit }, libraries) {
       console.log('Updating libraries', libraries.length, 'entries')
       setUserData('libraries', libraries)
       commit('setLibraries', libraries)
   }
}
