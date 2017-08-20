<template>
  <div class="schedule">
    <h1>Schedule</h1>
    <ul>
      <li v-for="(value, key) in events">
        <router-link :to="{ name: 'scheduledEvent', params: { eventId: key }}">Go to Event {{ key }}: {{ value.title }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import Events from '../Events'
export default {
  name: 'schedule',
  data () {
    return {
      events: null
    }
  },
  created () {
    this.events = Events.getAllEvents()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
