<template>
    <div class='container'>
        <!-- cover image -->
        <!-- table with details -->
        <table
            v-if='data.details.length != 0'
            class='details'>
            <tbody>
                <tr v-for='row in data.details'>
                    <template v-for='(value, key) in row'>
                        <td> {{ key }} </td>
                        <td> {{ sanitizeString(key, value) }} </td>
                    </template>
                </tr>
            </tbody>
        </table>
        <span
            v-else
            class='placeholder'>
            {{ loading.msg }}
        </span>
        <!-- table with availability info-->
        <div v-if='isDone()'>
            <table
                v-if='getPreferred(data.availability).length != 0 '
                class='availability'>
                <thead>
                    <tr>
                        <th>Library</th>
                        <th>Place</th>
                        <th>Signature</th>
                        <th>Order status</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for='instance in getPreferred(data.availability)'>
                        <td> {{ getShortLibrary(instance.library) }}</td>
                        <td> {{ instance.place }}</td>
                        <td> {{ instance.signature }}</td>
                        <td> {{ instance.orderStatus }}</td>
                        <td> {{ instance.status }}</td>
                    </tr>
                </tbody>
            </table>
            <div
                v-if='getNotPreferred(data.availability).length != 0'
                class='placeholder'>
                <span>Available in:</span>
                <br />
                <template v-for='instance in getNotPreferred(data.availability)'>
                    {{ getShortLibrary(instance.library) }},
                </template>
            </div>
            <span
                v-if='data.availability.length == 0'
                class='placeholder'>
                Not available in any libraries.
            </span>
        </div>
        <LoadingCircle v-if='isLoading()'/>
    </div>
</template>

<script>
import MediumIcon from './icons/MediumIcon.vue'
import LoadingCircle from './icons/LoadingCircle.vue'
import { shortenLibraryName, sanitizeDetail } from '../utils/string.js'
import { mapState, mapGetters } from 'vuex'
import { LOADING, DONE } from '../utils/constants.js'

export default {
  components: {
    LoadingCircle,
    MediumIcon
  },
  computed: {
    ...mapState({
      data: state => state.preview,
      loading: state => state.loading.preview
    }),
    ...mapGetters([
      'getPreferredLibraries'
    ])
  },
  methods: {
    // returns a shorter name for the library
    getShortLibrary (library) {
      return shortenLibraryName(library)
    },
    // get only availabilities from preferred libraries
    getPreferred (availabilities) {
      return availabilities.filter(obj => this.getPreferredLibraries.includes(obj.library))
    },
    // get only availabilities from preferred libraries
    getNotPreferred (availabilities) {
      return availabilities.filter(obj => !this.getPreferredLibraries.includes(obj.library))
    },
    // removes unncessary infos from strings
    sanitizeString (key, value) {
      return sanitizeDetail(key, value)
    },
    // returns true if the component is currently fetching data
    isLoading () {
      return this.loading.status === LOADING
    },
    // returns true if the component has finished fetching data
    isDone () {
      return this.loading.status === DONE
    }
  }
}
</script>

<style scoped>
.container {
    grid-row: 2 / 3;
    grid-column: 2 / 3;
}

.title {
}

.details {
    margin-bottom: 32px;
}

.details tbody tr td:first-child{
    font-weight: bold;
}

.availability {
    margin-bottom: 16px;
}

.availability,
.availability th,
.availability td {
    border-width: 1px 0;
    border-style: solid;
    border-color: #CCC;
    border-collapse: collapse;
}

.details,
.details th,
.details td {
    border-width: 1px;
    border-style: solid;
    border-color: #CCC;
    border-collapse: collapse;
}

th, td {
    padding: 8px;
    vertical-align: top;
}
</style>
