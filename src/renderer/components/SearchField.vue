<template>
    <div class='container'>
       <span>Search</span>
       <input ref='input' placeholder='Search for books, cds...' @keyup.enter='search($refs.input.value)'/>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    methods: mapActions([
        'search'
    ])
}
</script>

<style scoped>
.container {
    grid-column: 1 / 3;
    grid-row: 1 / 2;
    padding: 8px 0 24px 0;
}

span {
    padding-right: 4px;
}

input {
    height: 24px;
    width: 50%;
    font-size: 16px;
}
</style>
