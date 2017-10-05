<template>
  <div id="layout" class="content" :class="{active: menuVisible}">
    <filter-events @menuVisible="onMenuVisibleChange"/>
    <div class="content-wrapper">
      <div class="schedule">
        <h2>Schedule</h2>
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
        events: null,
        eventsByDay: null,
        menuVisible: false
      }
    },
    created () {
      this.events = Conference.getAllEvents()
      this.eventsByDay = Conference.getEventsByDay()
    },
    methods: {
      onMenuVisibleChange (newValue) {
        this.menuVisible = newValue
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
