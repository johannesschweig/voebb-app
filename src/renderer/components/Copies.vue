<template>
    <div v-if='isDone()'>
        <table
            v-if='getPreferred(data.availability).length != 0 '
            class='availability'>
            <tbody>
                <tr
                    v-for='instance in getPreferred(data.availability)' 
                    :class='{"not-available": instance.status !== "Verfügbar"}' >
                    <td>
                        <LibraryIcon />
                        {{ getShortLibrary(instance.library) }}
                        <template v-if='instance.status === "Verfügbar"'>
                            ({{ instance.place }})
                        </template>
                    </td>
                    <td v-if='instance.status.startsWith("Verfügbar")'>
                        <SignatureIcon />
                        {{ instance.signature }}
                    </td>
                    <td v-else-if='instance.status.startsWith("Ausgeliehen -")'>
                        {{ getDaysDueString(instance.status) }} days left
                    </td>
                    <td v-else>
                        {{ instance.status }}
                    </td>
                </tr>
            </tbody>
        </table>
        <div
            v-if='getNotPreferred(data.availability).length != 0'
            class='placeholder'>
            <span>Available in:</span>
            <br />
            <span>
                {{ getNotPreferred(data.availability).map(e => getShortLibrary(e.library)).join(', ') }}
            </span>
        </div>
        <span
            v-if='data.availability.length == 0'
            class='placeholder'>
            Not available in any libraries.
        </span>
    </div>
</template>

<script>
import LibraryIcon from '../assets/library.svg'
import SignatureIcon from '../assets/code.svg'
import { mapState, mapGetters } from 'vuex'
import { DONE } from '../utils/constants.js'
import { getDaysDue, shortenLibraryName } from '../utils/string.js'

export default {
  components: {
    LibraryIcon,
    SignatureIcon
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
    getDaysDueString (avail) {
      return getDaysDue(avail)
    },
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
    // returns true if the component has finished fetching data
    isDone () {
      return this.loading.status === DONE
    }
  }
}
</script>

<style scoped>
table {
    font-size: 14px;
    font-weight: 300;
    margin-bottom: 60px;
}

td {
    padding-right: 32px;
}

svg {
    transform: scale(0.5);
    vertical-align: middle;
}

svg * {
    stroke: var(--color-3);
    fill: var(--color-3);
}

.not-available {
  opacity: .6;
}
</style>
