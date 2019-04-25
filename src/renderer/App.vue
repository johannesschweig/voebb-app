<template>
    <div id='app'>
        <Searchpage />
    </div>
</template>

<script>
import Searchpage from './components/Searchpage.vue'

export default {
    components: {
        Searchpage
    }
}
</script>

<style scoped>
    #app {
        font-family: Lato, sans-serif;
        color: #3e3e3e;
        padding: 0 16px;
    }
</style>
