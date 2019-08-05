<template>
    <div class='container'>
        <h1>Search</h1>
        <div class='grid'>
            <div class='inputfield'>
                <SearchIcon />
                <input
                    ref='input'
                    placeholder='Search for books, cds...'
                    @keyup.enter='search($refs.input.value)' />
            </div>
            <Sorter v-if='multipleResultsAvailable' />
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import SearchIcon from '../assets/search.svg'
import Sorter from './Sorter.vue'

export default {
  components: {
    SearchIcon,
    Sorter
  },
  methods: mapActions([
    'search'
  ]),
  computed: mapGetters([
    'multipleResultsAvailable'
  ])
}
</script>

<style scoped>
.container {
  position: absolute;
  width: 100%;
}

.grid {
  display: grid;
  grid-template-columns: 360px 1fr;
}

.inputfield {
    position: relative;
    width: 360px;
    display: inline-block;
}

.inputfield input {
    border: none;
    background-color: #fff;
    display: block;
    height: 32px;
    width: 100%;
    box-sizing: border-box;
    padding-left: 32px;
    font-size: 18px;
    border: 1px solid var(--color-2);
    border-radius: 2px;
    color: var(--color-4);
}

.inputfield input:focus,
.inputfield input:active {
    outline-width: 0;
    border: 1px solid var(--color-3);
}

.inputfield input::placeholder {
    font-size: 16px;
}

.inputfield svg {
    position: absolute;
    transform: scale(0.625);
}

.inputfield svg * {
    stroke: var(--color-3);
}

.grid > div:nth-child(2) {
  align-self: center;
  justify-self: right;
}
</style>
