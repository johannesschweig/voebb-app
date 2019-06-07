<template>
    <div id='app'>
        <Navigation />
        <keep-alive>
            <component :is='currentPage' />
        </keep-alive>
    </div>
</template>

<script>
import BookmarksPage from './components/BookmarksPage.vue'
import Navigation from './components/Navigation.vue'
import SearchPage from './components/SearchPage.vue'
import SettingsPage from './components/SettingsPage.vue'
import { mapState } from 'vuex'

export default {
  components: {
    BookmarksPage,
    Navigation,
    SearchPage,
    SettingsPage
  },
  computed: mapState({
    'currentPage': state => state.currentPage
  }),
  created () {
    // read in bookmarks from file
    this.$store.dispatch('readUserData')
    // TODO remove before deployment
    // this.$store.dispatch('fakeSearch')
    // this.$store.dispatch('fakeFetchDetails')
    // this.$store.dispatch('search', 'felix und felka')
  }
}
</script>

<style>
#app {
    font-family: Lato, sans-serif;
    color: #3e3e3e;
    padding: 8px 16px;
}

i {
    opacity: .9;
}

.placeholder {
    font-size: 14px;
    opacity: .5;
    font-style: italic;
}

</style>
