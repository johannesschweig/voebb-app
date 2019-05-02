import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations.js'
import actions from './actions.js'
import getters from './getters.js'

Vue.use(Vuex)

// initial state
const state = {
    currentPage: 'SearchPage',/* 'BookmarksPage',*/
    searchResults: [
        // { title: ..., name: ..., medium: ..., year: ..., img: ..., avail: ...}
    ],
    preview: {
        details: [],
        availability: []
    },
    bookmarks: {
        lastUpdated: '',
        data: [
            // { identifier: 'AK123', details: [..], availability: [...]}
        ]
    },
    // list of preferred libraries
    libraries: []
}

export default new Vuex.Store({
    state,
    getters,
    // setters,
    actions,
    mutations
})
