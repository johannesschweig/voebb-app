<template>
    <keep-alive>
        <transition
            :name='transitionName' >
            <router-view />
        </transition>
    </keep-alive>
</template>

<script>
import { PREVIEW } from '../utils/constants.js'

export default {
  data () {
    return {
      transitionName: ''
    }
  },
  // check what transition to choose
  watch: {
    '$route' (to, from) {
      let prior = from.path.slice(1).split('/')
      let after = to.path.slice(1).split('/')
      // top level navigation
      if (prior[0] !== after[0]) {
        this.transitionName = ''
      } //else {
        // sub level navigation
      //   if (after[1] === PREVIEW) {
      //     this.transitionName = 'slide-left'
      //   } else {
      //     this.transitionName = 'slide-right'
      //   }
      // }
    }
  }
}
</script>


<style scoped>
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
    transition: transform 0.4s ease-in-out;
}

.slide-right-enter,
.slide-left-leave-to {
    transform: translateX(-100%);
}

.slide-left-enter,
.slide-right-leave-to {
    transform: translateX(100%);
}
</style>