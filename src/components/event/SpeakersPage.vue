<template>
  <div class="content">
    <div class="alternate" v-if="Object.keys(speakers).length === 0">
      <img src="../../assets/img/ajax-circle.gif" />
    </div>

    <table id="speakers" v-if="Object.keys(speakers).length > 0">
      <tbody>
      <tr tbody v-for="speaker in sortedSpeakers">
        <td class="speakerinfo">
          <div class="talk-cell">
            <div class="title darkLink">
              <router-link :to="{ name: 'speakerPage', params: { speakerId: speaker.id }}">
                <img alt="" v-lazy="speakerImageUrl(speaker)">
                <span>{{speaker.name}}</span>
              </router-link>
            </div>
            <div class="track"><span>{{speaker.company}}</span></div>
            <div class="room">
              <twitter :url="speaker.twitter"/>
            </div>
          </div>
        </td>
        <td class="speakerdetails">
          <div>{{bioShort(speaker)}}</div>
        </td>
        <td class="speakertalks">
          <div v-for="event in speakerEvents(speaker)">
            <event :event="event"/>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import Conference from '../../Conference'
  import Speaker from './Speaker.vue'
  import Twitter from './Twitter.vue'
  import Event from './Event.vue'

  var base = ''

  // test if we are running in local served mode to test offline mode
  if (window.location.href.indexOf('http://localhost:5000') !== -1) {
    base = 'https://latest.dukecon.org/javaland/2018/'
  }

  export default {
    beforeRouteEnter: (to, from, next) => {
      next(vm => {
        vm.eventbus.$emit('search.visible', true)
      })
    },
    components: {
      Event,
      Twitter,
      Speaker
    },
    name: 'speakersPage',
    data () {
      return {
        speakers: Conference.getAllSpeakers(),
        events: Conference.getAllEvents(),
        searchTerm: ''
      }
    },
    created () {
      this.eventbus.$on('search.term', this.searchEventReceived)
      this.eventbus.$emit('search.init')
    },
    beforeDestroy: function () {
      this.eventbus.$off('search.term', this.searchEventReceived)
    },
    computed: {
      // the data for the event can change once data is re-loaded in events or the eventId has been changed
      sortedSpeakers: function () {
        return Object.entries(this.speakers).map(e => e[1])
          .filter(s => this.search(s))
          .sort((a, b) => {
            const l1 = a.lastname.toUpperCase()
            const l2 = b.lastname.toUpperCase()
            if (l1 === l2) {
              return 0
            } else if (l1 < l2) {
              return -1
            } else {
              return 1
            }
          })
      }
    },
    methods: {
      speakerImageUrl: function (speaker) {
        if (speaker.photoId) {
          return base + 'rest/speaker/images/' + speaker.photoId
        } else {
          return require('@/assets/img/UnknownUser.png')
        }
      },
      bioShort: function (speaker) {
        if (!speaker.bio) {
          return ''
        }
        return speaker.bio.length > 220 ? speaker.bio.substring(0, 210) + '...' : speaker.bio
      },
      speakerEvents: function (speaker) {
        return speaker.eventIds
          .filter(e => { return e !== this.parentEventId })
          .map(e => this.events[e])
          .filter(e => { return e !== undefined })
      },
      searchEventReceived (term) {
        this.searchTerm = term
      },
      search: function (speaker) {
        return [speaker.name, speaker.company].join().toLocaleLowerCase().includes(this.searchTerm.toLowerCase())
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
