<template>
    <div class='container'>
        <h1>Bookmarks</h1>
        <div
            v-if='detailsAvailable'
            class='list' >
            <Card
                v-for='row in getSortedBookmarks'
                :key='row.identifier'
                :row='{
                    title: row.details["Titel"],
                    medium: row.details["Medienart"],
                    name: row.details["Verfasser"] || row.details["Person"],
                    year: row.details["Veröffentlichung"],
                    img: row.details.img,
                    availability: row.availability.message,
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
import LoadingCircle from './icons/LoadingCircle.vue'
import { mapState, mapGetters } from 'vuex'
import { LOADING } from '../utils/constants.js'
import { exportBookmarksFile } from '../utils/file.js'

export default {
  components: {
    Card,
    LoadingCircle
  },
  computed: {
    ...mapState({
      lastUpdated: state => state.bookmarks.lastUpdated,
      loading: state => state.bookmarks.loading
    }),
    ...mapGetters([
      'detailsAvailable',
      'getSortedBookmarks'
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
    width: calc(100vw - 84px - 16px);
}

.list {
  margin-right: 16px;
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
</style>
