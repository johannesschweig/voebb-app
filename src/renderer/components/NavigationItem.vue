<template>
    <div
        :class="{ 'active': currentPage === page }"
        @click='switchPage(page)' >
        <i :class='icon'></i>
        <span>{{ label }}</span>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  props: {
    page: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    }
  },
  computed: mapState({
    'currentPage': state => state.currentPage
  }),
  methods: mapActions([
    'switchPage'
  ])

}
</script>

<style scoped>
div {
    opacity: .5;
    cursor: pointer;
    padding: 8px 4px 4px 4px;
    margin: 0 32px 0 0;
}

div:hover,
div.active {
    opacity: 1;
}

div.active,
div.active {
    border-width: 0 0 2px 0;
    border-style: solid;
    border-color: #3e3e3e;
}

span{
    font-size: 18px;
}

i {
    padding-right: 2px;
}
</style>
