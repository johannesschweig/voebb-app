<template>
  <div id='app'>
      <Searchfield />
      <Searchresults />
  </div>
</template>

<script>
  import Searchfield from './components/Searchfield.vue'
  import Searchresults from './components/Searchresults.vue'

  export default {
    components: {
        Searchfield,
        Searchresults
    }
  }
</script>

<style scoped>
    #app {
        font-family: Lato, sans-serif;
        padding: 0 16px;
    }
</style>
