<template>
  <div class="talk-widget">
    <div :class="timeClass">
      <div class="talk-info">
        <div class="title darkLink">
          <!-- TODO
              <img class="fav-largescreen" style="cursor:pointer; margin-right: 2px;"
                                             alt="Favorit +-" title="Favorit +-"
                                             data-bind="click: toggleFavourite, clickBubble: false, attr:{src: talk.favicon}"/>
                                             -->
          <router-link :to="{ name: 'scheduledEventPage', params: { eventId: event.id }}" style="padding: 0">{{event.title}}</router-link>
        </div>

        <div class="fully-booked stamp" v-if="event.fullyBooked">{{ $t('fullyBooked') }}</div>
        <div class="speaker" v-for="s in eventSpeaker"><span>{{ s.name }}</span></div>

        <scheduled-event-icons :event="event"/>
      </div>
    </div>
  </div>
</template>

<script>
  import ScheduledEventIcons from './ScheduledEventIcons.vue'
  import Conference from '../../Conference'

  var getTimeCategory = function (duration) {
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
      ScheduledEventIcons
    },
    props: {
      event
    },
    name: 'event',
    data () {
      return {
        speakers: Conference.getAllSpeakers()
      }
    },
    computed: {
      eventSpeaker: function () {
        return this.event.speakerIds.map(id => this.speakers[id])
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
