import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations.js'
import actions from './actions.js'
import getters from './getters.js'

Vue.use(Vuex)

// initial state
const state = {
    currentPage: 'SearchPage',
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
    libraries: [],
    // loading state of components
    loading: {
        searchResults: {
            status: 'initial', // status of the component: either initial, loading, done, error
            msg: 'You have not searched for anything yet.' // message to the user
        },
        preview: {
            status: 'initial',
            msg: ''
        },
        bookmarks: {
            status: 'initial',
            msg: ''
        }
    }
}

export default new Vuex.Store({
    state,
    getters,
    // setters,
    actions,
    mutations
})
