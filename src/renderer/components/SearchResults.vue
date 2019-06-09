<template>
    <div class='container'>
        <template v-if='loading.status == "done" && results.length != 0'>
            <Card
                v-for='row in results'
                :key='row.identifier'
                :row='row'
                wrapper='Search' />
        </template>
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
import { mapState } from 'vuex'
import { LOADING } from '../utils/constants.js'

export default {
  components: {
    Card,
    LoadingCircle
  },
  computed: {
    ...mapState({
      results: state => state.searchResults,
      loading: state => state.loading.searchResults
    })
  },
  methods: {
    // if the component is currently loading new data
    isLoading () {
      return this.loading.status === LOADING
    }
  }
}
</script>

<style scoped>
.container {
    grid-row: 2 / 3;
    grid-column: 1 / 2;
    margin-right: 16px;
    width: calc(100vw - 84px - 32px);
}
</style>
