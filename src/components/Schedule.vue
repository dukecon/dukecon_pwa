<template>
  <div id="layout" class="content" :class="{active: menuVisible}">
    <filter-events @menuVisible="onMenuVisibleChange"/>
    <div class="content-wrapper">
      <div class="schedule">
        <h2>Schedule</h2>
        Filter: {{ filter }}
        <ul>
          <li v-for="(events, day) in eventsByDay">
            {{ day }}
            <ul>
              <li v-for="(value, key) in events">
                <router-link :to="{ name: 'scheduledEventPage', params: { eventId: value.id }}">Go to Event {{ key
                  }}: {{ value.title }}
                </router-link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import Conference from '../Conference'
  import FilterEvents from './schedule/FilterEvents.vue'

  export default {
    components: {
      FilterEvents
    },
    name: 'schedule',
    data () {
      return {
        events: Conference.getAllEvents(),
        eventsByDay: Conference.getEventsByDay(),
        menuVisible: false,
        filter: null
      }
    },
    created () {
      this.eventbus.$on('filter', this.filterEventReceived)
    },
    beforeDestroy: function () {
      this.eventbus.$off('filter', this.filterEventReceived)
    },
    methods: {
      onMenuVisibleChange (newValue) {
        this.menuVisible = newValue
      },
      filterEventReceived (filter) {
        this.filter = filter
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
