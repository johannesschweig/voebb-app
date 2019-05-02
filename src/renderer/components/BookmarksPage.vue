<template>
    <div class='container'>
        <div v-if='detailsAvailable'>
            <button @click='refetchExisting'>Refresh</button>
            <span>Last updated:</span>
            <span> {{ lastUpdated }}</span>
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
                                {{ getLibraryAlias(avail.library) }}
                            </div>
                            <div class='signature'>
                                <i class="fas fa-barcode"></i>
                                {{ avail.signature }}
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <span
            v-else
            class='placeholder'>
            You have not added any entries to your bookmarks yet.
        </span>
    </div>
</template>

<script>
import { getEntryDetails } from '../utils/requests.js'
import { libraryAliases } from '../utils/constants.js'
import AvailableIcon from './icons/AvailableIcon.vue'
import LinkIcon from './icons/LinkIcon.vue'
import RemoveIcon from './icons/RemoveIcon.vue'
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
    computed: {
        ...mapState({
            data: state => state.bookmarks.data,
            lastUpdated: state => state.bookmarks.lastUpdated
        }),
        ...mapGetters([
            'detailsAvailable',
            'getPreferredLibraries'
        ]),
    },
    components: {
        AvailableIcon,
        LinkIcon,
        RemoveIcon
    },
    methods: {
        // get property (e.g. title, person) from array of objects
        getProperty(arr, prop) {
            return arr.filter(e => Object.keys(e)[0] == prop)[0][prop]
        },
        // returns a shorter alias name for the library
        getLibraryAlias(library) {
            return libraryAliases[library]
        },
        // refresh the existing bookmarks
        refetchExisting() {
            this.$store.dispatch('readBookmarks')
        },
        // get only availabilities from preferred libraries
        getPreferred(availabilities) {
            return availabilities.filter(obj => this.getPreferredLibraries.includes(obj.library))
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
</style>
