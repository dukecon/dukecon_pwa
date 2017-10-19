<template>
  <div id="content" v-bind:class="{'search-result': this.searchTerm.length > 2}">
    <div id="swipeable" v-if="this.searchTerm.length < 3">
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

    <div class="alternate" v-if="Object.keys(eventsByDay).length === 0">
      <img src="../../assets/img/ajax-circle.gif"/>
    </div>

    <div id="talks-grid" v-if="groupedTalks.length > 0">
      <table v-for="group in groupedTalks">
        <tr>
          <td v-if="searchTerm.length < 3">
            <div class="time-cell title">{{group.slotDisplay}}</div>
          </td>
          <td>
            <div>
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
        events: Conference.getAllEvents(),
        speakers: Conference.getAllSpeakers(),
        isoDate: null,
        filter: null,
        searchTerm: '',
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
        let filteredTalks
        if (this.searchTerm.length >= 3) {
          filteredTalks = Object.values(this.events)
            .filter(e => {
              let abstractText = e.abstractText || ''
              let speakerInfos = e.speakerIds.map(id => this.speakers[id]).map(s => [s.name, s.company].join()).join()
              return e.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                abstractText.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                speakerInfos.toLowerCase().includes(this.searchTerm.toLowerCase())
            })
        } else {
          filteredTalks = Object.values(this.eventsByDay[this.selectedDay])
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
        }
        filteredTalks
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
      this.eventbus.$on('search.term', this.searchEventReceived)
      this.eventbus.$emit('filter.init')
      this.eventbus.$emit('search.init')
    },
    beforeDestroy: function () {
      this.eventbus.$off('filter.status', this.filterEventReceived)
      this.eventbus.$off('search.term', this.searchEventReceived)
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
      searchEventReceived (term) {
        this.searchTerm = term
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
