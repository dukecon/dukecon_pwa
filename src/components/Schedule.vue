<template>
  <div class="content">
    <div class="content-wrapper">
      <div class="schedule">
        <h2>Schedule</h2>
        <ul>
          <li v-for="(events, day) in eventsByDay">
            {{ day }}
            <ul>
              <li v-for="(value, key) in events">
                <router-link :to="{ name: 'scheduledEventPage', params: { eventId: key }}">Go to Event {{ key }}: {{ value.title }}</router-link>
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

  export default {
    name: 'schedule',
    data () {
      return {
        events: null,
        eventsByDay: null
      }
    },
    created () {
      this.events = Conference.getAllEvents()
      this.eventsByDay = Conference.getEventsByDay()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
