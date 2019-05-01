import { search, getEntryDetails } from '../utils/requests.js'
import { readFileAsync, writeFileAsync } from '../utils/file.js'
import { getCurrentDateString } from '../utils/string.js'


// actions
export default {
    // read bookmarks from file
    readBookmarks ({ commit }) {
        readFileAsync('/../../bookmarks.txt')
            .then(res => {
                // fetch all bookmarks details, availability
                let promises = []
                res.map(bookmark => {
                    promises.push(getEntryDetails(bookmark))
                })
                return Promise.all(promises)
            }).then(res => {
                commit('setBookmarks', res)
                commit('setLastUpdated', getCurrentDateString())
            })
    },
    // toggles a bookmark: removes or adds it
    // active: if the bookmark is active or not
    // identifier: of the instance
    toggleBookmark ({ commit, getters }, payload) {
        if (payload.active) {
            // update bookmarks file
            let string = getters.bookmarksList.filter(b => b != payload.identifier).join('\n')
            writeFileAsync('/../../bookmarks.txt', string)
            commit('removeBookmark', payload.identifier)
        } else {
            // fetch all bookmarks details, availability
            getEntryDetails(payload.identifier)
                .then(res => {
                    let string = getters.bookmarksList.concat([payload.identifier]).join('\n')
                    writeFileAsync('/../../bookmarks.txt', string)
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
        search(term, false).then(res => {
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
        // update bookmarks file
        let string = getters.bookmarksList.filter(b => b != identifier).join('\n')
        writeFileAsync('/../../bookmarks.txt', string)
        commit('removeBookmark', identifier)
   }
}
