<template>
    <div>
        <Searchfield @search='search' />
        <Searchresults :results='searchResults' />
    </div>
</template>

<script>
import Searchfield from './Searchfield.vue'
import Searchresults from './Searchresults.vue'
import search from '../utils/requests.js'

export default {
    data() {
        return {
            searchResults: []
        }
    },
    components: {
        Searchfield,
        Searchresults
    },
    methods: {
        search(term) {
            search(term).then(res => {
                this.searchResults = res
            })
        }
    },
    mounted() {
        //TODO remove before deployment
        search('', true).then(res => {
            this.searchResults = res
        })
    }
}
</script>
