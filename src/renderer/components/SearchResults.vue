<template>
    <div class='container'>
        <table>
            <tbody>
                <tr v-for='row in results' @click.left='open(row.link)'>
                    <td>
                        <img :src='row.img'/>
                    </td>
                    <td>
                        <div class='info'>
                            <div class='title'>
                                <MediumIcon :medium='row.medium'/>
                                {{ row.title }} ({{ row.medium }})
                            </div>
                            <div class='subtitle'>
                                {{ row.name }}  -  {{ row.year }}
                            </div>
                        </div>
                    </td>
                    <td class='availability'>
                        <AvailableIcon :avail='row.avail' />
                    </td>
                    <td class='link'>
                        <a
                            :href='"https://voebb.de/aDISWeb/app?service=direct/0/Home/$DirectLink&sp=SPROD00&sp=S" + row.link'
                            target='_blank'
                            >
                            <i class="fas fa-external-link-square-alt"></i>
                        </a>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import MediumIcon from './icons/MediumIcon.vue'
import AvailableIcon from './icons/AvailableIcon.vue'

export default {
    components: {
        AvailableIcon,
        MediumIcon
    },
    props: {
        results: {
            type: Array,
            required: true
        }
    },
    methods: {
        // opens the clicked row in the preview
        open(link) {
            this.$emit('open', link)
        }
    }
}
</script>

<style scoped>
.container {
    grid-row: 2 / 3;
    grid-column: 1 / 2;
    margin-right: 16px;
}

table {
    overflow: scroll;
    height: 500px;
}

table, th, td {
    border-width: 1px 0;
    border-style: solid;
    border-color: #CCC;
    border-collapse: collapse;
}

tbody {
    display: block;
    overflow-y: auto;
    height: calc(100vh - 150px);
}

th {
    font-weight: normal;
    font-size: 16px
}

tr {
    height: 50px;
    cursor: pointer;
}
tr:hover,
tr:focus {
    background-color: #F0F0F0;
}


tr:active {
    background-color: #E1E1E1;
}

.info {
    padding: 8px;
}

.title {
    padding-bottom: 8px;
}

.subtitle {
    font-size: 12px;
    color: #808080;
}

.availability {
    padding: 0 8px;
}

.link {
    padding: 0 16px 0 8px;
}

img {
    padding: 8px 8px 8px 0;
}
</style>
