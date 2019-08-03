<template>
    <div>
        <span>Sort:</span>  
        <select
            :style='calculateWidth'
            @change='sortResults($event)'>
            <option
                v-for='crit in criterions'
                :key='crit'
                :value='crit'
                :selected='isSelected(crit)' >
                {{ crit }}
            </option>
        </select>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { SEARCH, SEARCH_PAGE_CRITERIONS, BOOKMARKS_PAGE_CRITERIONS, SEARCH_WRAPPER, BOOKMARKS_WRAPPER } from '../utils/constants.js'

export default {
  computed: {
    ...mapState({
      sortingSearch: state => state.search.sorting,
      sortingBookmarks: state => state.bookmarks.sorting
    }),
    // returns the criterions for this sorter
    criterions() {
      let path = this.$route.path.slice(1)
      path = path.slice(0, path.indexOf('/'))
      if (path === SEARCH_WRAPPER) {
        return SEARCH_PAGE_CRITERIONS
      } else if (path === BOOKMARKS_WRAPPER) {
        return BOOKMARKS_PAGE_CRITERIONS
      }
    },
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
    },
    // returns true if criterion is selected
    isSelected (criterion) {
      let path = this.$route.path.slice(1)
      path = path.slice(0, path.indexOf('/'))
      if (path === SEARCH_WRAPPER) {
        return criterion === this.sortingSearch
      } else if (path === BOOKMARKS_WRAPPER) {
        return criterion === this.sortingBookmarks
      }
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

