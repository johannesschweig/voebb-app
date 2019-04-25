<template>
    <div>
        <table>
            <tbody>
                <tr v-for='row in results'>
                    <td>
                        <img :src='row.img'/>
                    </td>
                    <td>
                        <div class='info'>
                            <div class='title'>
                                <i v-if='row.medium == "DVD"' class="fas fa-film"></i>
                                <i v-if='row.medium == "CD"' class="fas fa-compact-disc"></i>
                                <i v-if='row.medium == "Buch" || row.medium == "Band"' class="fas fa-book"></i>
                                {{ row.title }} ({{ row.medium }})
                            </div>
                            <div class='subtitle'>
                                {{ row.name }}
                            </div>

                        </div>
                    </td>
                    <td class='year'>
                        {{ row.year }}
                    </td>
                    <td class='availability' v-html='getAvailable(row.avail)'></td>
                    <td>
                        <a :href='"https://voebb.de/aDISWeb/app?service=direct/0/Home/$DirectLink&sp=SPROD00&sp=S" + row.link' target='_blank'><i class="fas fa-external-link-square-alt"></i></a>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    // import search from '../utils/requests.js'

    export default {
        props: {
            results: {
                type: Array,
                required: true
            }
        },
        methods: {
            getAvailable(avail) {
                switch(avail) {
                    case 'ist verfügbar': return '<i class="far fa-check-circle"></i>'
                    break
                    case 'ist zur Zeit nicht verfügbar': return '<i class="fas fa-times"></i>'
                    break
                    case 'siehe Vollanzeige': return '<i class="fas fa-question"></i>'
                    break
                    default: return avail
                }
            }
        },
        mounted () {
            // TODO make this work on search button press
            // search('Heiner lauterbach', true).then(res => {
                // this.results = res
            // })

        }
    }
</script>

<style scoped>
table, th, td {
  border-width: 1px 0;
  border-style: solid;
  border-color: #CCC;
  border-collapse: collapse;
}

th {
    font-weight: normal;
    font-size: 16px
}

tr {
    height: 50px;
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

i {
    opacity: .9;
}

.year {
    padding: 12px;
}

.availability {
    padding: 16px;
}

img {
    padding: 8px 8px 8px 0;
}
</style>
