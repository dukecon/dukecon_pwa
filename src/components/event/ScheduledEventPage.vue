<template>
  <div class="content-wrapper">
    <scheduled-event :event="event" v-if="event"></scheduled-event>
    <div class="content" v-else>
      <div>{{ $t('talk.notFound') }}</div>
    </div>
  </div>
</template>

<script>
import Conference from '../../Conference'
import ScheduledEvent from './ScheduledEvent.vue'

export default {
  components: {
    ScheduledEvent
  },
  name: 'scheduledEventPage',
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
    '$route': 'fetchEventId'
  },
  methods: {
    fetchEventId () {
      this.eventId = this.$route.params.eventId
    }
  }
}
</script>
