<template>
    <i
        v-if='avail == "ist verfügbar"'
        class='far fa-check-circle'
    ></i>
    <i
        v-else-if='avail == "ist zur Zeit nicht verfügbar"'
        class='fas fa-times'
    ></i>
    <i
        v-else-if='avail == "siehe Vollanzeige"'
        class='fas fa-question'
    ></i>
    <span v-else>{{ avail }}</span>
</template>

<script>
export default {
    props: {
        avail: {
            type: String,
            required: true
        }
    }
}
</script>

<style scoped>

</style>
getAvailable(avail) {
            switch(avail) {
                default: return avail
            }
        },
