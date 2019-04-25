<template>
    <div id='app'>
        <Navigation :currentPage='currentPage' @switch-page='switchPage'/>
        <keep-alive>
            <component
                :is='currentPage'>
            </component>
        </keep-alive>
    </div>
</template>

<script>
import BookmarksPage from './components/BookmarksPage.vue'
import Navigation from './components/Navigation.vue'
import SearchPage from './components/SearchPage.vue'

export default {
    data () {
        return {
            currentPage: 'SearchPage'
        }
    },
    components: {
        BookmarksPage,
        Navigation,
        SearchPage
    },
    methods: {
        // switch pages: search or bookmarks
        switchPage(page) {
            this.currentPage = page
        }
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
</style>
