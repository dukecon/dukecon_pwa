<template>
  <div class="content talk-content">
    <div style="margin:5px;">
      <span style="font-size:110%; font-weight:bold;">{{event.title}}</span>
    </div>
    <table id="talkinfo">
      <tr>
        <td class="talk-details">
          <div class="speaker-list" v-for="es in eventSpeaker" :key="es.id">
            <div class="label">
              <div>
                <router-link :to="{ name: 'speakerPage', params: { speakerId: es.id }}" class="speaker-link">
                  {{es.name}}
                </router-link>
                <span class="speakerinfo" v-if="es.company">{{ es.company }}</span>
                <twitter :url="es.twitter"/>
              </div>
            </div>
          </div>

          <favourite :event="event" />

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
        <speaker v-for="s in eventSpeaker" :speaker="s" :parentEventId="event.id" :key="s.id" />
      </div>
    </template>
  </div>
</template>

<script>
  import Conference from '../../Conference'
  import ScheduledEventIcons from './ScheduledEventIcons.vue'
  import Twitter from './Twitter.vue'
  import Speaker from './Speaker.vue'
  import Favourite from './Favourite.vue'

  export default {
    components: {
      Favourite,
      Speaker,
      Twitter,
      ScheduledEventIcons
    },
    name: 'scheduledEvent',
    props: ['event'],
    data () {
      return {
        speakers: Conference.getAllSpeakers()
      }
    },
    computed: {
      abstractTextHtml: function () {
        if (!this.event.abstractText) {
          return ''
        }
        return this.event.abstractText.split('\n').join('<br />')
      },
      eventSpeaker: function () {
        return this.event.speakerIds
          .map(id => this.speakers[id])
          .filter(s => s !== undefined)
      }
    }
  }
</script>
