<template>
    <div class='root'>
        <SearchField @search='search' />
        <SearchResults :results='searchResults' @open='open'/>
        <Preview :data='previewData'/>
    </div>
</template>

<script>
import Preview from './Preview.vue'
import SearchField from './SearchField.vue'
import SearchResults from './SearchResults.vue'
import { search, getEntryDetails } from '../utils/requests.js'

export default {
    data() {
        return {
            searchResults: [],
            previewData: {
                details: [],
                availability: []
            }
        }
    },
    components: {
        Preview,
        SearchField,
        SearchResults
    },
    methods: {
        // trigger search when searchfield sends ENTER
        search(term) {
            search(term).then(res => {
                this.searchResults = res
            })
        },
        // fetches data and displays row in preview
        open(link) {
            getEntryDetails(link).then(res => {
                this.previewData = res
            })
        }
    },
    mounted() {
        //TODO remove before deployment
        search('Franz marc pferde', true).then(res => {
            this.searchResults = res
        })
        //TODO remove before deployment
        getEntryDetails('AK03461116', true).then(res => {
            this.previewData = res
        })
    }
}
</script>

<style scoped>
.root {
    display: grid;
    grid-template: 62px 1fr / 2fr 1fr;
    grid-column-gap: 24px;
}
</style>
