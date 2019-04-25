<template>
    <div class='container'>
       <span>Search</span>
       <input ref='input' placeholder='Search for books, cds...' @keyup.enter='submit'/>
    </div>
</template>

<script>
export default {
    methods: {
        // submit the search
        submit() {
            this.$emit('search', this.$refs.input.value)
        }
    }
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
