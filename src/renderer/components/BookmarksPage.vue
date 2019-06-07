<template>
    <div class='container'>
        <div v-if='detailsAvailable'>
            <button @click='exportBookmarks'>Export bookmarks</button>
            <table v-if='data.length != 0'>
                <tbody>
                    <tr v-for='instance in data'>
                        <td class='instance'>
                            <div class='title'>{{ getProperty(instance.details, 'Titel') }}</div>
                            <div class='person'>
                                 <!-- {{ getProperty(instance.details, 'Person') }} -->
                                <LinkIcon :identifier='instance.identifier' />
                                <RemoveIcon :identifier='instance.identifier' />
                            </div>
                        </td>
                        <td v-for='avail in getPreferred(instance.availability)'>
                            <AvailableIcon
                            :avail='avail.status'
                            class='fa-2x'/>
                            <div class='library'>
                                <i class="fas fa-landmark"></i>
                                {{ getShortLibrary(avail.library) }}
                            </div>
                            <div class='signature'>
                                <i class="fas fa-barcode"></i>
                                {{ avail.signature }}
                            </div>
                        </td>
                        <td v-if='getPreferred(instance.availability).length == 0'>
                            <span class='placeholder'>Not available in your preferred libraries</span>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class='last-updated'>
                <span class='placeholder'>Last updated:</span>
                <span class='placeholder'> {{ lastUpdated }}</span>
                <button @click='refetchExisting'><i class="fas fa-sync-alt"></i></button>
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
import { shortenLibraryName } from '../utils/string.js'
import AvailableIcon from './icons/AvailableIcon.vue'
import LinkIcon from './icons/LinkIcon.vue'
import LoadingCircle from './icons/LoadingCircle.vue'
import RemoveIcon from './icons/RemoveIcon.vue'
import { mapState, mapGetters } from 'vuex'
import { LOADING } from '../utils/constants.js'
import { exportBookmarksFile } from '../utils/file.js'

export default {
  computed: {
    ...mapState({
      data: state => state.bookmarks.data,
      lastUpdated: state => state.bookmarks.lastUpdated,
      loading: state => state.loading.bookmarks
    }),
    ...mapGetters([
      'detailsAvailable',
      'getPreferredLibraries'
    ])
  },
  components: {
    AvailableIcon,
    LinkIcon,
    LoadingCircle,
    RemoveIcon
  },
  methods: {
    // get property (e.g. title, person) from array of objects
    getProperty (arr, prop) {
      return arr.filter(e => Object.keys(e)[0] === prop)[0][prop]
    },
    // returns a shorter name for the library
    getShortLibrary (library) {
      return shortenLibraryName(library)
    },
    // refresh the existing bookmarks
    refetchExisting () {
      this.$store.dispatch('readUserData')
    },
    // get only availabilities from preferred libraries
    getPreferred (availabilities) {
      return availabilities.filter(obj => this.getPreferredLibraries.includes(obj.library))
    },
    // return true if the component is currently fetching data
    isLoading () {
      return this.loading.status === LOADING
    },
    // exports the bookmarks to a text file
    exportBookmarks () {
      exportBookmarksFile(this.data)
    }
  }
}
</script>

<style scoped>
.container {
    padding: 8px 0 24px 0;
}

table {
    margin-top: 18px;
    text-align: left;
}
table, th, td {
    border-width: 1px 0;
    border-style: solid;
    border-color: #CCC;
    border-collapse: collapse;
}

td {
    padding: 12px 0;
}

i {
    padding-right: 2px;
}

.instance {
    padding-right: 32px;
}

.fa-2x {
    padding: 8px calc((80px - 32px)/2);
}

.library {
    margin-bottom: 4px;
}

.title {
    margin-bottom: 4px;
}

.person {
    font-size: 14px;
    opacity: .8;
}

.last-updated {
    margin-top: 12px;
}

.last-updated button {
    margin-left: 4px;
}
</style>
