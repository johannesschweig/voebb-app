<template>
<div>
<!-- <span>test: {{progress}}</span> -->
    <svg
      height='120'
      width='120' >
      <circle
        stroke-width='10'
        fill='transparent'
        stroke='gray'
        r='50'
        cx='60'
        cy='60' />
      <circle
        class='progress-ring'
        stroke-width='10'
        fill='transparent'
        stroke='blue'
        r='50'
        cx='60'
        cy='60'
        :style='{"stroke-dashoffset": Math.round((100 - progress) / 100 * 314) }' />
    </svg>
</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: mapState({
    progress: state => state.search.loading.progress
  })
}
</script>

<style scoped>
  svg {
    transform: rotate(-90deg);
    /* margin-left: 30vw; */
    margin: 0 auto;
  }

  svg circle:nth-child(2) {
    transition: 0.35s stroke-dashoffset;
    transform-origin: 50% 50%;
    stroke-dasharray: 314 314;
    stroke-dashoffset: 314;
  }
</style>