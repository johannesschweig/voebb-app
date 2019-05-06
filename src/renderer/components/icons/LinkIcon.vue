<template>
    <a
    :href='"https://voebb.de/aDISWeb/app?service=direct/0/Home/$DirectLink&sp=SPROD00&sp=S" + identifier'
    target='_blank'
    >
    <i class="fas fa-lg fa-external-link-square-alt"></i>
</a>
</template>

<script>
export default {
    props: {
        identifier: {
            type: String,
            required: true
        }
    }
}
</script>

<style scoped>
i {
    color: #3e3e3e;
    opacity: .7;
}

i:hover,
i:focus,
i:active {
    opacity: 1;
}
</style>
