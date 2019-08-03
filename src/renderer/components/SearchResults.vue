<template>
    <div class='container'>
        <template v-if='resultsAvailable'>
            <Card
                v-for='row in data'
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
import { mapState, mapGetters } from 'vuex'
import { LOADING } from '../utils/constants.js'

export default {
  components: {
    Card,
    LoadingCircle
  },
  computed: {
    ...mapState({
      data: state => state.search.data,
      loading: state => state.search.loading
    }),
    ...mapGetters([
      'resultsAvailable'
    ])
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
}
</style>
