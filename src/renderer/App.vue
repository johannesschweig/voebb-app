<template>
    <div id='app'>
        <Navigation />
        <keep-alive>
            <router-view />
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
    'currentPage': state => state.navigation.currentPage
  }),
  created () {
    // read in bookmarks from file
    // this.$store.dispatch('readUserData')
    this.$store.dispatch('fakeReadUserData')
    // this.$store.dispatch('fakeSearch')
    // this.$store.dispatch('search', 'felix felka')
    // this.$store.dispatch('search', 'sams taschenbier')
  }
}
</script>

<style>
:root {
  --color-1: #f9f9f9;
  --color-2: #bcbab8;
  --color-3: #808080;
  --color-4: #333333;
}

i {
    opacity: .9;
}

.placeholder {
    font-size: 14px;
    font-weight: 300;
    opacity: .5;
    font-style: italic;
}

h1 {
    font-size: 30px;
    margin: 0;
    color: var(--color-4);
    padding-bottom: 16px;
}


.active-card {
    background-color: var(--color-2);
}

</style>

<style scoped>
#app {
    font-family: Lato, sans-serif;
    height: 100vh;
    width: 100vw;
    overflow-x: hidden;
    position: fixed;
}

#app div:nth-child(2) {
    position: absolute;
    left: 84px;
    top: 16px;
    margin-bottom: 16px;
}
</style>

