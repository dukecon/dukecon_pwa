<template>
  <event :mode="'grid'" :event="event"></event>
</template>

<script>
  import Event from '../event/Event.vue'

  export default {
    components: {Event},
    name: 'timetable-item',
    props: [ 'event' ]
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
