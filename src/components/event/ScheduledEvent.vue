<template>
  <div class="content-wrapper">
    <div class="content talk-content" v-if="event">
      <div style="margin:5px;">
        <span style="font-size:110%; font-weight:bold;">{{event.title}}</span>
      </div>
      <table id="talkinfo">
        <tr>
          <td class="talk-details">
            <div class="speaker-list" v-for="es in eventSpeaker">
              <div class="label">
                <div>
                  <router-link :to="{ name: 'speakerPage', params: { speakerId: es.id }}" class="speaker-link"
                  >{{es.name}}</router-link><span class="speakerinfo" v-if="es.company">, {{ es.company }}</span>
                  <twitter :url="es.twitter"/>
                </div>
              </div>
            </div>

            <scheduled-event-icons :event="event"/>

            <div class="fully-booked" v-if="event.fullyBooked">{{ $t('fullyBooked') }}</div>

          </td>
          <td class="talk-abstract">
            <div class="label">Abstract</div>
            <div class="talk-abstract" v-html="abstractTextHtml"/>
          </td>
        </tr>
      </table>
      <template v-if="eventSpeaker.length > 0">
        <h2> {{ $t('speaker') }} </h2>
        <div id="speakersubpage">
          <template v-for="s in eventSpeaker">
            <speaker :speaker="s" :parentEventId="event.id"/>
          </template>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
  import Conference from '../../Conference'
  import ScheduledEventIcons from './ScheduledEventIcons.vue'
  import Twitter from './Twitter.vue'
  import Speaker from './Speaker.vue'

  export default {
    components: {
      Speaker,
      Twitter,
      ScheduledEventIcons
    },
    name: 'scheduledEvent',
    data () {
      return {
        eventId: null,
        events: Conference.getAllEvents(),
        speakers: Conference.getAllSpeakers()
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
      },
      abstractTextHtml: function () {
        var event = this.events[this.eventId]
        if (event) {
          return this.events[this.eventId].abstractText.split('\n').join('<br />')
        } else {
          return ''
        }
      },
      eventSpeaker: function () {
        var event = this.events[this.eventId]
        if (event) {
          return event.speakerIds.map(id => this.speakers[id])
        } else {
          return []
        }
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
