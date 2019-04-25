<template>
    <div>
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
div {
    padding-top: 20px;
    padding-bottom: 30px;
}
</style>
