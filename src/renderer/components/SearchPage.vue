<template>
    <div
        class='root' >
        <SearchField />
        <SearchResults />
    </div>
</template>

<script>
import SearchField from './SearchField.vue'
import SearchResults from './SearchResults.vue'

export default {
  components: {
    SearchField,
    SearchResults
  }
}
</script>

<style scoped>
.root {
    display: grid;
    grid-template: 108px 1fr / 100vw 100vw;
    overflow-x: hidden;
}

.root > div:nth-child(1) {
    padding-bottom: 24px;
}
</style>
