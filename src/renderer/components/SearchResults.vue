<template>
    <div class='container'>
        <table v-if='results.length != 0'>
            <tbody>
                <tr v-for='row in results' @click.left='fetchDetails(row.identifier)'>
                    <td>
                        <img :src='row.img'/>
                    </td>
                    <td>
                        <div class='info'>
                            <div class='title'>
                                <MediumIcon :medium='row.medium'/>
                                {{ row.title }} ({{ row.medium }})
                            </div>
                            <div class='subtitle'>
                                {{ row.name }}  -  {{ row.year }}
                            </div>
                        </div>
                    </td>
                    <td class='availability'>
                        <AvailableIcon :avail='row.avail' />
                    </td>
                    <td>
                        <BookmarkIcon
                            :active='bookmarksList.indexOf(row.identifier) != -1'
                            :identifier='row.identifier' />
                    </td>
                    <td class='link'>
                        <LinkIcon :identifier='row.identifier' />
                    </td>
                </tr>
            </tbody>
        </table>
        <span
            v-else
            class='placeholder'>
            No results
        </span>
    </div>
</template>

<script>
import BookmarkIcon from './icons/BookmarkIcon.vue'
import MediumIcon from './icons/MediumIcon.vue'
import LinkIcon from './icons/LinkIcon.vue'
import AvailableIcon from './icons/AvailableIcon.vue'
import { mapActions, mapState, mapGetters } from 'vuex'

export default {
    components: {
        AvailableIcon,
        BookmarkIcon,
        LinkIcon,
        MediumIcon
    },
    computed: {
        ...mapState({
            results: state => state.searchResults
        }),
        ...mapGetters([
            'bookmarksList'
        ])
    },
    methods: mapActions([
        'fetchDetails'
    ])
}
</script>

<style scoped>
.container {
    grid-row: 2 / 3;
    grid-column: 1 / 2;
    margin-right: 16px;
}

table {
    overflow: scroll;
    height: 500px;
}

table, th, td {
    border-width: 1px 0;
    border-style: solid;
    border-color: #CCC;
    border-collapse: collapse;
}

tbody {
    display: block;
    overflow-y: auto;
    height: calc(100vh - 150px);
}

th {
    font-weight: normal;
    font-size: 16px
}

tr {
    height: 50px;
    cursor: pointer;
}
tr:hover,
tr:focus {
    background-color: #F0F0F0;
}


tr:active {
    background-color: #E1E1E1;
}

.info {
    padding: 8px;
}

.title {
    padding-bottom: 8px;
}

.subtitle {
    font-size: 12px;
    color: #808080;
}

.availability {
    padding: 0 8px;
}

.link {
    padding: 0 16px 0 8px;
}

img {
    padding: 8px 8px 8px 0;
}
</style>
