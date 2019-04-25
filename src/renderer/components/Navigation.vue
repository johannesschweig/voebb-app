<template>
    <div class='container'>
        <div
            class='search'
            :class="{ 'active': this.currentPage === 'SearchPage' }"
            @click='switchPage("SearchPage")'
        >
            <i class="fas fa-search"></i>
            <span>Search</span>
        </div>
        <div
            class='bookmarks'
            :class="{ 'active': this.currentPage === 'BookmarksPage' }"
            @click='switchPage("BookmarksPage")'
        >
            <i class="fas fa-bookmark"></i>
            <span>Bookmarks</span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        currentPage: {
            type: String,
            required: true
        }
    },
    methods: {
        switchPage(page) {
            // different page than currently
            if (page != this.currentPage) {
                this.$emit('switch-page', page)
            }
        }
    }
}
</script>

<style scoped>
.container {
    display: flex;
    margin-bottom: 12px;
}

.search,
.bookmarks {
    opacity: .5;
    cursor: pointer;
    padding: 8px 4px 4px 4px;
    margin: 0 32px 0 0;
}

.search:hover,
.bookmarks:hover,
.search.active,
.bookmarks.active {
    opacity: 1;
}

.search.active,
.bookmarks.active {
    border-width: 0 0 2px 0;
    border-style: solid;
    border-color: #3e3e3e;
}

.search span,
.bookmarks span{
    font-size: 18px;
}

.bookmarks i {
    padding-right: 2px;
}
</style>
