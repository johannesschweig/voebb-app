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
                        <td> {{ value }} </td>
                    </template>
                </tr>
            </tbody>
        </table>
        <span
            v-else
            class='placeholder'>
            Could not retrieve any data about details.
        </span>
        <!-- table with availability info-->
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
                    <td> {{ getLibraryAlias(instance.library) }}</td>
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
                {{ instance.library}},
            </template>
        </div>

        <span
            v-if='data.availability.length == 0'
            class='placeholder'>
            Not available in any libraries.
        </span>
</div>
</template>

<script>
import MediumIcon from './icons/MediumIcon.vue'
import { libraryAliases } from '../utils/constants.js'
import { mapState, mapGetters } from 'vuex'

export default {
    components: {
        MediumIcon
    },
    computed: {
        ...mapState({
            data: state => state.preview
        }),
        ...mapGetters([
            'getPreferredLibraries'
        ])
    },
    methods: {
        // returns a shorter alias name for the library
        getLibraryAlias(library) {
            let alias = libraryAliases[library]
            // alias present
            if (alias) {
                return alias
            } else { // no alias present
                return library
            }
        },
        // get only availabilities from preferred libraries
        getPreferred(availabilities) {
            return availabilities.filter(obj => this.getPreferredLibraries.includes(obj.library))
        },
        // get only availabilities from preferred libraries
        getNotPreferred(availabilities) {
            return availabilities.filter(obj => !this.getPreferredLibraries.includes(obj.library))
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
