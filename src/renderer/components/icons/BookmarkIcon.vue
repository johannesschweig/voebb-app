<template>
    <i
        :class="['fa-bookmark', { 'fas': active, 'far': !active }]">
        @click='clicked'
    </i>
</template>

<script>
export default {
    props: {
        active: {
            type: Boolean,
            required: true
        },
        identifier: {
            type: String,
            required: true
        }
    },
    methods: {
        clicked() {
            this.$emit('bookmark', this.identifier)
        }
    }
}
</script>

<style scoped>
i:hover,
i:active,
i:focus {
    color: #000;
}
</style>
