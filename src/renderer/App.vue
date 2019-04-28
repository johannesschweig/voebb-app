<template>
    <div id='app'>
        <Navigation :currentPage='currentPage' @switch-page='switchPage'/>
        <SearchPage
            v-show='currentPage == "SearchPage"'
            :bookmarks='bookmarks'
            @addBookmark='addBookmark' />
        <BookmarksPage
            v-show='currentPage == "BookmarksPage"'
            @bookmarks='updateBookmarks' />
    </div>
</template>

<script>
import BookmarksPage from './components/BookmarksPage.vue'
import Navigation from './components/Navigation.vue'
import SearchPage from './components/SearchPage.vue'

export default {
    data () {
        return {
            // currentPage: 'SearchPage'
            currentPage: 'BookmarksPage',
            bookmarks: []
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
        },
        // updates current bookmarks
        updateBookmarks(bookmarks) {
            this.bookmarks = bookmarks
        },
        // adds a bookmark
        addBookmark(identifier) {
            this.bookmarks.push(identifier)
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

.placeholder {
    font-size: 12px;
    opacity: .5;
    font-style: italic;
}

</style>
