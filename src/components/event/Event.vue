<template>
  <div class="talk-widget">
    <div class="talk-cell" :class="timeClass">
      <favourite :event="event" :mode="'standard'"/>
      <long-talk-marker :event="event" threshold-in-minutes="60"/>
      <router-link :to="{ name: 'scheduledEventPage', params: { eventId: event.id }}" style="padding: 0">
        <div class="talk-info">
          <div class="title darkLink">
            <a>{{event.title}}</a> <!-- the a is for preservation of the hover effect....  -->
            <img v-if="mode === 'grid' && Object.keys(languages).length > 1" class="language-icon" :src="languageIcon">
          </div>
          <div class="fully-booked stamp" v-if="event.fullyBooked">{{ $t('fullyBooked') }}</div>
          <div class="speaker">
            <span v-for="(s, i) in eventSpeaker" :key="s.id">{{ s.name }}<span v-if="i < eventSpeaker.length -1">, </span></span>
          </div>

          <scheduled-event-icons :event="event" :mode="mode"/>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import ScheduledEventIcons from './ScheduledEventIcons.vue'
import Conference from '../../Conference'
import Favourite from './Favourite.vue'
import LongTalkMarker from './LongTalkMarker'

function getTimeCategory (duration) {
  if (typeof duration === 'undefined' || (duration > 30 && duration <= 60)) {
    return 'regular'
  }
  if (duration <= 30) {
    return 'short'
  }
  return 'long'
}

export default {
  components: {
    Favourite,
    ScheduledEventIcons,
    LongTalkMarker
  },
  props: ['event', 'mode'],
  name: 'event',
  data () {
    return {
      speakers: Conference.getAllSpeakers(),
      languages: Conference.getAllLanguages()
    }
  },
  computed: {
    eventSpeaker: function () {
      return this.event.speakerIds.map(id => this.speakers[id])
    },
    languageIcon: function () {
      let prefix = ''
      if (!this.event.simultan) {
        prefix += 'lang_'
      }
      return require('@/assets/img/' + prefix + this.languages[this.event.languageId].code + '.png')
    },
    timeClass: function () {
      return getTimeCategory(this.event.durationInMinutes)
    }
  }
}
</script>
