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
  import Events from '../Events'

  export default {
    name: 'scheduledEvent',
    data () {
      return {
        event: null
      }
    },
    created () {
      // fetch the data when the view is created and the data is
      // already being observed
      this.fetchData()
    },
    computed: {
      fullMessage: function () {
        return 'Welcome to Your Vue.js PWA' + this.$route.params.eventId
      }
    },
    watch: {
      '$route': 'fetchData'
    },
    methods: {
      fetchData () {
        this.event = Events.getEvent(this.$route.params.eventId)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
