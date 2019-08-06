import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations.js'
import actions from './actions.js'
import getters from './getters.js'
import { INITIAL, SEARCH_PAGE_CRITERIONS, BOOKMARKS_PAGE_CRITERIONS } from '../utils/constants.js'

Vue.use(Vuex)

// initial state
const state = {
  search: {
    data: [], // { title: ..., name: ..., medium: ..., year: ..., img: ..., avail: ...}
    loading: {
      progress: 0, // progress from 0 to 100
      // status of the component: either initial, loading, done, error
      status: 'loading',
      // message to the user
      msg: 'You have not searched for anything yet.'
    },
    sorting: SEARCH_PAGE_CRITERIONS[0] // most relevant
  },
  preview: {
    data: {
      // identifier:
      details: [], // [{ "Medienart": "CD", "Art/Inhalt": "Biografie", "Titel": "E.T.A. Hoffmann : aus dem Leben eines skeptischen Phantasten ; [CD] / E.T.A. Hoffmann. Regie: Martina Boette-Sonner. Gelesen von Rüdiger Safranski. Musik von E.T.A. Hoffmann", "Person": "Hoffmann, E. T. A. [Textverfasser/in] Boette-Sonner, Martina [Regie] Safranski, Rüdiger [Sprecher/in]", "Veröffentlichung": "München: Der Hörverlag, 1998 Carl Hanser Verlag", "Umfang / Dauer": "3 CD", "Sprache": "Deutsch", "ISBN": "3-89584-558-2" }]
      copies: [],
      availability: {} // { days: 0, message: '0 days left'}
    },
    loading: {
      status: INITIAL,
      msg: ''
    }
  },
  bookmarks: {
    lastUpdated: '',
    data: [
      // { identifier: 'AK123', details: [..], copies: [...], availability: { days: 0, message: '0 days left'} }
    ],
    loading: {
      status: INITIAL,
      msg: 'You have not added any bookmarks yet.'
    },
    sorting: BOOKMARKS_PAGE_CRITERIONS[0] // available
  },
  // list of preferred libraries
  libraries: []
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
