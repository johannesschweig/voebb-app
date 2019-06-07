import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations.js'
import actions from './actions.js'
import getters from './getters.js'
import { INITIAL } from '../utils/constants.js'

Vue.use(Vuex)

// initial state
const state = {
  currentPage: 'SearchPage',
  searchResults: [
    // { title: ..., name: ..., medium: ..., year: ..., img: ..., avail: ...}
  ],
  preview: {
    // identifier:
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
      // status of the component: either initial, loading, done, error
      status: INITIAL,
      // message to the user
      msg: 'You have not searched for anything yet.'
    },
    preview: {
      status: INITIAL,
      msg: ''
    },
    bookmarks: {
      status: INITIAL,
      msg: 'You have not added any bookmarks yet.'
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
