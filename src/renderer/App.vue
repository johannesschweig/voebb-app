<template>
  <div id='app'>
      <h1>test</h1>
  </div>
</template>

<script>
  import search from './utils/requests.js'

  export default {
    mounted () {
      search('Rüdiger Hoffmann')
    }
  }
</script>

<style scoped>
  /* CSS */
</style>
