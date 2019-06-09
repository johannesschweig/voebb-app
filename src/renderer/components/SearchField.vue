<template>
    <div>
        <h1>Search</h1>
        <div class='inputfield'>
            <SearchIcon />
            <input ref='input' placeholder='Search for books, cds...' @keyup.enter='search($refs.input.value)'/>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import SearchIcon from '../assets/search.svg'

export default {
  components: {
    SearchIcon
  },
  methods: mapActions([
    'search'
  ])
}
</script>

<style scoped>
.inputfield {
    position: relative;
    width: 360px;
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

</style>
