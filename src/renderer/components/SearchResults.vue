<template>
    <div :class='["container", { "fill-space": previewIsInitial()}]'>
        <table v-if='loading.status == "done" && results.length != 0'>
            <tbody>
                <tr
                    v-for='row in results'
                    :class='{ "active-row": row.identifier == activeRow}'>
                    <td
                        class='fetch'
                        @click.left='fetchDetails(row.identifier)'>
                        <img :src='row.hasOwnProperty("img") ? row.img : ""' />
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
        <LoadingCircle v-else-if='isLoading()'/>
        <span
            v-else
            class='placeholder'>
            {{ loading.msg }}
        </span>
    </div>
</template>

<script>
import BookmarkIcon from './icons/BookmarkIcon.vue'
import MediumIcon from './icons/MediumIcon.vue'
import LinkIcon from './icons/LinkIcon.vue'
import LoadingCircle from './icons/LoadingCircle.vue'
import AvailableIcon from './icons/AvailableIcon.vue'
import { mapActions, mapState, mapGetters } from 'vuex'
import { INITIAL, LOADING } from '../utils/constants.js'

export default {
  components: {
    AvailableIcon,
    BookmarkIcon,
    LinkIcon,
    LoadingCircle,
    MediumIcon
  },
  computed: {
    ...mapState({
      results: state => state.searchResults,
      loading: state => state.loading.searchResults,
      previewStatus: state => state.loading.preview.status,
      activeRow: state => state.preview.identifier
    }),
    ...mapGetters([
      'bookmarksList'
    ])
  },
  methods: {
    ...mapActions([
      'fetchDetails'
    ]),
    // if the component is currently loading new data
    isLoading () {
      return this.loading.status === LOADING
    },
    previewIsInitial () {
      return this.previewStatus === INITIAL
    }
  }
}
</script>

<style scoped>
.container {
    grid-row: 2 / 3;
    grid-column: 1 / 2;
    margin-right: 16px;
}

.fill-space {
    grid-column: 1 / 3;
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
}

.active-row {
    background-color: aliceblue;
}

.fetch {
    cursor: pointer;
    border-width: 1px;
    border-style: solid;
    border-color: #CCC;
    border-collapse: collapse;
    padding: 8px;
}

.fetch:hover,
.fetch:focus {
    background-color: #F0F0F0;
}


.fetch:active {
    background-color: #E1E1E1;
}

.info {
    padding-top: 4px;
}

.title {
    padding-bottom: 4px;
}

.subtitle {
    font-size: 12px;
    color: #808080;
}

.availability {
    padding: 0 8px 0 16px;
    border-width: 1px 0 1px 1px;
    border-style: solid;
    border-color: #CCC;
    border-collapse: collapse
}

.link {
    padding: 0 16px 0 8px;
    border-width: 1px 1px 1px 0;
    border-style: solid;
    border-color: #CCC;
    border-collapse: collapse

}

img {
    padding-right: 16px;
    float: left;
    min-width: 90px;
    min-height: 50px;
}
</style>
