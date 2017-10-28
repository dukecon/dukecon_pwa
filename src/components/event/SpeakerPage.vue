<template>
  <div id="speakerpage" class="content-wrapper">
    <div class="content">
      <speaker :speaker="speaker" v-if="speaker"></speaker>
    </div>
  </div>
</template>

<script>
  import Conference from '../../Conference'
  import Speaker from './Speaker.vue'

  export default {
    components: {
      Speaker
    },
    name: 'speakerPage',
    data () {
      return {
        speakerId: null,
        speakers: Conference.getAllSpeakers()
      }
    },
    created () {
      // fetch the data when the view is created and the data is
      // already being observed
      this.fetchSpeakerId()
    },
    computed: {
      // the data for the event can change once data is re-loaded in events or the eventId has been changed
      speaker: function () {
        return this.speakers[this.speakerId]
      }
    },
    watch: {
      // the route information might change if someone changes the URL or uses a bookmark
      '$route': 'fetchSpeakerId'
    },
    methods: {
      fetchSpeakerId () {
        this.speakerId = this.$route.params.speakerId
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
