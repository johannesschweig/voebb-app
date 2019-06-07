<template>
    <div class='container'>
        <NavigationItem
            page='SearchPage'
            label='Search'
            icon='fas fa-search' />
        <NavigationItem
            page='BookmarksPage'
            label='Bookmarks'
            icon='fas fa-bookmark' />
        <NavigationItem
            page='SettingsPage'
            label='Settings'
            icon='fas fa-cog' />
    </div>
</template>

<script>
import NavigationItem from './NavigationItem.vue'

export default {
  components: {
    NavigationItem
  }
}
</script>

<style scoped>
.container {
    display: flex;
    margin-bottom: 12px;
}


</style>
