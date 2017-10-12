<template>
  <div id="content" data-bind="css: { 'search-result' : $root.searchTerm().length > 2 }">
    <div id="swipeable" data-bind="visible: searchTerm().length <= 2">
      <div id="days_filter">
        <template v-for="day in days">
          <button class="day-widescreen" type="button" @click="updateDay(day)"
                  :class="{ highlightBack: day.isoDate === selectedDay }">{{day.displayLong}}
          </button>
          <button class="day-smallscreen" type="button" @click="updateDay(day)"
                  :class="{ highlightBack: day.isoDate === selectedDay }">
            {{day.displayShort}}
          </button>
        </template>
      </div>
    </div>
    <!-- the condition "Object.keys(eventsByDay).length > 0" prevents the message to be shown when no events have been loaded yet -->
    <div id="nothingtoshow" class="alternate" v-if="groupedTalks.length === 0 && Object.keys(eventsByDay).length > 0">
      <span>{{$t('notalksfound')}}</span>
      <a class="clickable" @click='deactivateFilters'>{{$t('deactivate')}}</a> <span>{{$t('or')}}</span>
      <a class="clickable" @click='resetFilters'>{{$t('reset')}}</a><span>!</span><br>
      <span>{{$t('disablefavorites')}}</span>
    </div>

    <div id="talks-grid" v-if="groupedTalks.length > 0">
      <table v-for="group in groupedTalks">
        <tr>
          <td data-bind="visible: $root.searchTerm().length <= 2">
            <div class="time-cell title">{{group.slotDisplay}}</div>
          </td>
          <td>
            <div data-bind="foreach: talks">
              <event :event="talk" v-for="talk in group.talks" :key="talk.id"></event>
            </div>
            <a class="uparrow clickable" :title="$t('uparrow')" @click="goUp">&uArr;</a>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
  import Conference from '../../Conference'
  import Favourites from '../../Favourites'
  import Moment from 'moment'
  import Event from '../event/Event.vue'

  const sortByOrder = function (o1, o2) {
    const l1 = o1.slot
    const l2 = o2.slot
    if (l1 === l2) {
      return 0
    } else if (l1 < l2) {
      return -1
    } else {
      return 1
    }
  }

  export default {
    components: {Event},
    name: 'talks-grid',
    data () {
      return {
        eventsByDay: Conference.getEventsByDay(),
        isoDate: null,
        filter: null,
        favourites: Favourites.getFavorites()
      }
    },
    computed: {
      days: function () {
        let dates = Object.keys(this.eventsByDay).sort()
        if (this.isoDate === null && dates.length > 0) {
          this.isoDate = dates[0]
        }
        return dates.map(e => {
          const m = Moment(e)
            .locale(this.$i18n.locale)
          return {
            // format it as needed
            displayLong: m.format('dddd, Do MMMM'),
            displayShort: m.format('dd, Do MMM'),
            isoDate: e
          }
        })
      },
      selectedDay: function () {
        let dates = Object.keys(this.eventsByDay).sort()
        if (this.isoDate === null && dates.length > 0) {
          return dates[0]
        } else {
          return this.isoDate
        }
      },
      groupedTalks: function () {
        let groupedTalks = {}
        if (this.selectedDay === null) {
          // no data has been loaded yet
          return {}
        }
        Object.values(this.eventsByDay[this.selectedDay])
          .filter(e => {
            if (this.filter !== null) {
              // if the filter is active, filter all categories and favourites
              if (Object.keys(this.filter.categories.language).length > 0) {
                if (this.filter.categories.language[e.languageId] === undefined) {
                  return false
                }
              }
              if (Object.keys(this.filter.categories.level).length > 0) {
                if (this.filter.categories.level[e.audienceId] === undefined) {
                  return false
                }
              }
              if (Object.keys(this.filter.categories.track).length > 0) {
                if (this.filter.categories.track[e.trackId] === undefined) {
                  return false
                }
              }
              if (Object.keys(this.filter.categories.location).length > 0) {
                if (this.filter.categories.location[e.locationId] === undefined) {
                  return false
                }
              }
              if (this.filter.onlyFavourites) {
                if (this.favourites[e.id] === undefined) {
                  return false
                }
              }
            }
            return true
          })
          .forEach(e => {
            const c = groupedTalks[e.start]
            if (c === undefined) {
              groupedTalks[e.start] = []
            }
            groupedTalks[e.start].push(e)
          })
        return Object.entries(groupedTalks)
          .map((a) => {
            return {
              slot: a[0],
              slotDisplay: Moment(a[0]).locale(this.$i18n.locale).format('HH:mm'),
              talks: a[1]
            }
          })
          .sort(sortByOrder)
      }
    },
    created () {
      this.eventbus.$on('filter.status', this.filterEventReceived)
      this.eventbus.$emit('filter.init')
    },
    beforeDestroy: function () {
      this.eventbus.$off('filter.status', this.filterEventReceived)
    },
    methods: {
      updateDay: function (day) {
        this.isoDate = day.isoDate
      },
      resetFilters: function () {
        this.eventbus.$emit('filter.reset')
      },
      deactivateFilters: function () {
        this.eventbus.$emit('filter.deactivate')
      },
      filterEventReceived (filter) {
        this.filter = filter
      },
      goUp () {
        window.scrollTo(0, 0)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
