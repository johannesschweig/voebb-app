<template>
    <div class='container'>
        <div v-if='this.data.length != 0'>
            <button @click='refetchExisting'>Refresh</button>
            <span>Last updated:</span>
            <span> {{ lastUpdated }}</span>
            <table v-if='data.length != 0'>
                <tbody>
                    <tr v-for='(instance, index) in data'>
                        <td class='instance'>
                            <div class='title'>{{ getProperty(instance.details, 'Titel') }}</div>
                            <div class='person'>
                                <!-- {{ getProperty(instance.details, 'Person') }} -->
                                <LinkIcon :identifier='instance.identifier' />
                                <RemoveIcon
                                    :identifier='instance.identifier'
                                    @remove='remove' />
                            </div>
                        </td>
                        <td v-for='avail in instance.availability.filter(obj => obj.preferred)'>
                            <AvailableIcon
                            :avail='avail.status'
                            class='fa-2x'/>
                            <div class='library'>
                                <i class="fas fa-landmark"></i>
                                {{ getLibraryAlias(avail.library) }}
                            </div>
                            <div class='signature'>
                                <i class="fas fa-barcode"></i>
                                {{ avail.signature }}
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <span
            v-else
            class='placeholder'>
            You have not added any entries to your bookmarks yet.
        </span>
    </div>
</template>

<script>
import { getEntryDetails } from '../utils/requests.js'
import { libraryAliases } from '../utils/constants.js'
import AvailableIcon from './icons/AvailableIcon.vue'
import LinkIcon from './icons/LinkIcon.vue'
import RemoveIcon from './icons/RemoveIcon.vue'

export default {
    data() {
        return {
            // bookmarks: [],
            // bookmarks: ['AK12594954', 'AK02026972', 'AK34182220', 'AK16100851'],
            data: [],
            lastUpdated: ''
        }
    },
    components: {
        AvailableIcon,
        LinkIcon,
        RemoveIcon
    },
    methods: {
        // read bookmarks from bookmarks.json file
        readBookmarks() {
            var fs = require('fs')
            var _this = this
            fs.readFile(__dirname + '/../../bookmarks.txt', 'utf8', function(err, contents) {
                _this.refresh(contents.trim().split('\n'))
            })
        },
        // get property (e.g. title, person) from array of objects
        getProperty(arr, prop) {
            return arr.filter(e => Object.keys(e)[0] == prop)[0][prop]
        },
        // returns a shorter alias name for the library
        getLibraryAlias(library) {
            return libraryAliases[library]
        },
        // removes a bookmark from the list
        remove(identifier) {
            // update data
            this.data = this.data.filter(e => e.identifier != identifier)
            // update bookmarks file
            // var fs = require('fs')
            // let bookmarks = getBookmarks().join('\n')
            // fs.writeFile(__dirname + '/../../bookmarks.txt', bookmarks, function(err, contents) {
            //     if(err) {
            //         return console.log(err)
            //     }
            // })
            this.$emit('bookmarks', this.getBookmarks())
        },
        // refetches the bookmarks data and refreshes the view
        refresh(bookmarks) {
            this.data = []
            for (let i = 0; i < bookmarks.length; i++) {
                getEntryDetails(bookmarks[i]).then(res => {
                   this.data.push(res)
                   let date = new Date()
                   this.lastUpdated = date.getDate().toString().padStart(2, '0') + "-" + (date.getMonth() + 1).toString().padStart(2, '0') + "-" + date.getFullYear() + " " + date.getHours().toString().padStart(2, '0') + ":" + date.getMinutes().toString().padStart(2, '0')
                })
            }
            this.$emit('bookmarks', this.getBookmarks())
        },
        // refresh the existing bookmarks
        refetchExisting() {
            let bookmarks = getBookmarks()
            this.refresh(bookmarks)
        },
        // returns an array with identifiers of all bookmarks
        getBookmarks() {
            return this.data.map(i => i.identifier)
        }
    },
    mounted() {
        this.readBookmarks()
    }
}
</script>

<style scoped>
.container {
    padding: 8px 0 24px 0;
}

table {
    margin-top: 18px;
    text-align: left;
}
table, th, td {
    border-width: 1px 0;
    border-style: solid;
    border-color: #CCC;
    border-collapse: collapse;
}

td {
    padding: 12px 0;
}

i {
    padding-right: 2px;
}

.instance {
    padding-right: 32px;
}

.fa-2x {
    padding: 8px calc((80px - 32px)/2);
}

.library {
    margin-bottom: 4px;
}

.title {
    margin-bottom: 4px;
}

.person {
    font-size: 14px;
    opacity: .8;
}
</style>
