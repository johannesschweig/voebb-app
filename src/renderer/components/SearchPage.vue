<template>
    <div class='root'>
        <SearchField />
        <SearchResults />
        <Preview />
    </div>
</template>

<script>
import Preview from './Preview.vue'
import SearchField from './SearchField.vue'
import SearchResults from './SearchResults.vue'

export default {
  components: {
    Preview,
    SearchField,
    SearchResults
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
