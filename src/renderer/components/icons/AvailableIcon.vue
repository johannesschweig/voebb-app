<template>
    <i
        v-if="avail == 'ist verfügbar' || avail.toLowerCase().startsWith('verfügbar')"
        class='far fa-lg fa-check-circle'
    ></i>
    <i
        v-else-if='avail == "ist zur Zeit nicht verfügbar"'
        class='fas fa-lg fa-times'
    ></i>
    <i
        v-else-if='avail == "siehe Vollanzeige" || avail == ""'
        class='fas fa-lg fa-question'
    ></i>
    <div
        class='wait'
        v-else-if="avail.toLowerCase().startsWith('ausgeliehen')">
        <i class='far fa-clock'></i>
        <div class='days'> {{ getDaysDue(avail) }}</div>
    </div>
    <span
        class='unknown'
        v-else>
        {{ avail }}
    </span>
</template>

<script>
export default {
    props: {
        avail: {
            type: String,
            required: true
        }
    },
    methods: {
        // computes the days due until the book is available
        getDaysDue(avail) {
            let start = avail.indexOf(':') + 2
            let date = avail.substr(start)
            let parts = date.split('.')
            let date2 = new Date(parts[2] + '-' + parts[1].padStart(2, '0') + '-' + parts[0].padStart(2, '0'))
            let days = Math.round(Math.abs((new Date().getTime() - date2.getTime())/(24*60*60*1000)));
            return '(' + days + ')'
        }
    }
}
</script>

<style scoped>
    .wait {
        display: flex;
    }

    .unknown,
    .days {
        font-size: 16px;
    }

    .days {
        padding: 8px 0 0 4px;
    }
</style>
