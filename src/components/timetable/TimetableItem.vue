<template>
  <!-- add the ID to the event so that we can un- and re-bind this in the timetable -->
  <event :mode="'grid'" :event="event" :id="'ev-' + event.id"></event>
</template>

<script>
import Event from '../event/Event.vue'

export default {
  components: { Event },
  name: 'timetable-item',
  props: ['event']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
