<template>
  <div class="talk-widget">
    <div :class="timeClass">
      <favourite :event="event" :mode="'mobile'"/>
      <router-link :to="{ name: 'scheduledEventPage', params: { eventId: event.id }}" style="padding: 0">
        <div class="talk-info">
          <div class="title darkLink">
            <favourite :event="event" :mode="'small'"/>
            <a>{{event.title}}</a> <!-- the a is for preservation of the hover effect....  -->
            <img v-if="mode === 'grid'" class="language-icon" :src="languageIcon">
          </div>
          <div class="fully-booked stamp" v-if="event.fullyBooked">{{ $t('fullyBooked') }}</div>
          <div class="speaker" v-for="s in eventSpeaker"><span>{{ s.name }}</span></div>

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
      ScheduledEventIcons
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
        var dateStart = new Date(this.event.start)
        var dateEnd = new Date(this.event.end)
        var millis = dateEnd - dateStart
        return 'talk-cell ' + getTimeCategory(millis / 1000 / 60)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
