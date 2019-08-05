<template>
    <div class='container'>
        <h1>Bookmarks</h1>
        <Sorter v-if='multipleBookmarksAvailable' />
        <div v-if='detailsAvailable' >
            <Card
                v-for='row in getSortedBookmarksData'
                :key='row.identifier'
                :row='{
                    title: row.details["Titel"],
                    medium: row.details["Medienart"],
                    name: row.details["Verfasser"] || row.details["Person"],
                    year: row.details["Veröffentlichung"],
                    img: row.details.img,
                    availability: row.availability,
                    identifier: row.identifier
                  }'
                wrapper='Bookmarks' />
            <div class='last-updated'>
                <span class='placeholder'>Last updated:</span>
                <span class='placeholder'> {{ lastUpdated }}</span>
                <button @click='exportBookmarks'>Export bookmarks</button>
            </div>
        </div>
        <LoadingCircle v-else-if='isLoading()'/>
        <span
            v-else
            class='placeholder'>
            {{ loading.msg }}
        </span>
    </div>
</template>

<script>
import Card from './Card.vue'
import Sorter from './Sorter.vue'
import LoadingCircle from './icons/LoadingCircle.vue'
import { mapState, mapGetters } from 'vuex'
import { LOADING } from '../utils/constants.js'
import { exportBookmarksFile } from '../utils/file.js'

export default {
  components: {
    Card,
    LoadingCircle,
    Sorter
  },
  computed: {
    ...mapState({
      lastUpdated: state => state.bookmarks.lastUpdated,
      loading: state => state.bookmarks.loading
    }),
    ...mapGetters([
      'detailsAvailable',
      'getSortedBookmarksData',
      'multipleBookmarksAvailable'
    ])
  },
  methods: {
    // return true if the component is currently fetching data
    isLoading () {
      return this.loading.status === LOADING
    },
    // exports the bookmarks to a text file
    exportBookmarks () {
      exportBookmarksFile(this.getSortedBookmarks)
    }
  }
}
</script>

<style scoped>
.container {
    width: calc(100vw - 84px - 32px);
}

.container > div:nth-child(2) {
    float: right;
}

.last-updated {
    margin-top: 12px;
}

.last-updated button {
    margin-left: 4px;
}

i {
    padding-right: 2px;
}

h1 {
  display: inline-block;
}

.container > span.placeholder {
  display: block;
}
</style>
