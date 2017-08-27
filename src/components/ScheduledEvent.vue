<template>
  <div class="talk">
    <template v-if="event">
      <h1>Scheduled Event</h1>
      <h2>{{ event.title }}</h2>
      <p>{{ event.abstractText}}</p>
    </template>
  </div>
</template>

<script>
  import Conference from '../Conference'

  export default {
    name: 'scheduledEvent',
    data () {
      return {
        eventId: null,
        events: Conference.getAllEvents()
      }
    },
    created () {
      // fetch the data when the view is created and the data is
      // already being observed
      this.fetchEventId()
    },
    computed: {
      // the data for the event can change once data is re-loaded in events or the eventId has been changed
      event: function () {
        return this.events[this.eventId]
      }
    },
    watch: {
      // the route information might change if someone changes the URL or uses a bookmark
      '$route': 'fetchData'
    },
    methods: {
      fetchEventId () {
        this.eventId = this.$route.params.eventId
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
