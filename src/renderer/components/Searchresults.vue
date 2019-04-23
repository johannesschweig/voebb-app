<template>
    <div>
        <table>
            <thead>
                <tr>
                    <th>
                        Cover
                    </th>
                    <th>
                        Title
                    </th>
                    <th>
                        Medium
                    </th>
                    <th>
                        Year
                    </th>
                    <th>
                        Availability
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for='row in results'>
                    <td>
                        <img :src='row.img'/>
                    </td>
                    <td>
                        {{ row.title }}
                    </td>
                    <td>
                        {{ row.medium }}
                    </td>
                    <td>
                        {{ row.year }}
                    </td>
                    <td>
                        {{ getAvailable(row.avail) }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import search from '../utils/requests.js'

    export default {
        data() {
            return {
                results: null
            }
        },
        methods: {
            getAvailable(avail) {
                switch(avail) {
                    case 'ist verfügbar': return '✓'
                    break
                    case 'ist zur Zeit nicht verfügbar': return 'X'
                    break
                    case 'siehe Vollanzeige': return '?'
                    break
                    default: return avail
                }
            }
        },
        mounted () {
            // TODO make this work on search button press
            this.results = search('Mario Barth')
        }
    }
</script>

<style scoped>
th {
    font-weight: normal;
    font-size: 16px
}
</style>
