<template>
    <i
        :class="['fa-bookmark', 'fa-lg', { 'fas': active, 'far': !active }]"
        @click.left="toggleBookmark( {'active': active, 'identifier': identifier} )" >
    </i>
</template>

<script>
import { mapActions } from 'vuex'

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
    methods: mapActions([
        'toggleBookmark'
    ])
}
</script>

<style scoped>
i {
  cursor: pointer;
}

i:hover,
i:active,
i:focus {
    color: #000;
}
</style>
