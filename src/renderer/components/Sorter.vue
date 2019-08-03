<template>
    <div>
        <span>Sort:</span>  
        <select
            :style='calculateWidth'
            @change='sortResults($event)'>
            <option
                v-for='crit in criterions'
                :key='crit'
                :value='crit' >
                {{ crit }}
            </option>
        </select>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import { SEARCH } from '../utils/constants.js'

export default {
  props: {
    criterions: {
      type: Array,
      required: true
    }
  },
  computed: {
    // calculates the recommended width for the select box according to the lengths of its labels
    calculateWidth() {
      let len = this.criterions.map(crit => crit.length)
      let w = Math.round(Math.max(...len) * 6.7 + 26)
      return {
        width: w + 'px'
      }
    }
  },
  methods: {
    ...mapActions([
    'setSorting'
    ]),
    // sorts the results according to the sorter's criterion
    sortResults (event) {
      this.setSorting({ page: SEARCH, criterion: event.target.value })
    }
  }
}
</script>

<style scoped>
div {
  display: inline;
}

span {
  color: var(--color-4);
  font-size: 14px;
  margin-right: 2px;
}

select {
	display: inline;
	font-size: 14px;
  font-weight: 700;
	color: var(--color-4);
	height: 28px;
	max-width: 100%;
	box-sizing: border-box;
	margin: 0;
  border: none;
	border-radius: 4px;
	-moz-appearance: none;
	-webkit-appearance: none;
	appearance: none;
  background-color: white;
  background:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='8' height='8' fill='#808080'><polygon points='0,0 8,0 4,4'/></svg>") no-repeat scroll 95% 60% transparent;
	background-repeat: no-repeat, repeat;
	background-position: right 4px top 65%, 0 0;
	background-size: .65em auto, 100%;
}

select::-ms-expand {
	display: none;
}

select:focus {
	box-shadow: none;
	outline: none;
}

</style>

