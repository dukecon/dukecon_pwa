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
                <twitter :url="es.twitter"></twitter>
              </div>
            </div>
          </div>

          <favourite :event="event"></favourite>

          <scheduled-event-icons :event="event"></scheduled-event-icons>

          <div class="fully-booked" v-if="event.fullyBooked">{{ $t('fullyBooked') }}</div>

          <event-feedback :event-id="event.id" login-message="true"></event-feedback>

          <template v-if="documents.length > 0">
            <div class="label" style="margin-top: 1em">{{ $t('documentDownload') }}</div>
            <ul>
              <li v-for="entry in documents" :key="entry[0]">
                <a :href="entry[1]" target="_blank">{{ $t('document.' + entry[0]) }}</a>
              </li>
            </ul>
          </template>

        </td>
        <td class="talk-abstract">
          <div class="label">Abstract</div>
          <div class="talk-abstract" v-html="abstractTextHtml"></div>
        </td>
      </tr>
    </table>
    <template v-if="eventSpeaker.length > 0">
      <h2> {{ $t('speaker') }} </h2>
      <div id="speakersubpage">
        <speaker v-for="s in eventSpeaker" :speaker="s" :parentEventId="event.id" :key="s.id"></speaker>
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
import EventFeedback from './EventFeedback.vue'

export default {
  components: {
    Favourite,
    Speaker,
    Twitter,
    ScheduledEventIcons,
    EventFeedback
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
    },
    documents: function () {
      return Object.entries(this.event.documents).filter(a => a[1] !== null)
    }
  }
}
</script>
