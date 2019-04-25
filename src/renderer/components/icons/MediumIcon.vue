<template>
    <i v-if='medium == "DVD"' class="fas fa-film"></i>
    <i v-else-if='medium == "CD"' class="fas fa-compact-disc"></i>
    <i v-else-if='medium == "Buch" || medium == "Band"' class="fas fa-book"></i>
</template>

<script>
export default {
    props: {
        medium: {
            type: String,
            required: true
        }
    }
}
</script>

<style scoped>

</style>
