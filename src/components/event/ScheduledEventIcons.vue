<template>
  <div>
    <div :class="timeClass">
      <img width="16" height="16" src="../../assets/img/Clock.png" alt="Startzeit" title="Startzeit"/>
      <span>{{ startDayTime }} ({{ durationInMinutes }} min)</span>
    </div>
    <div class="room">
      <img width="16" height="16" src="../../assets/img/Home.png" alt="Raum" title="Raum"/>
      <span>{{ locationName }}</span>
      <template v-if="location.capacity">
        &nbsp;&nbsp;
        <img width="16" height="16" src="../../assets/img/chair.svg" alt="Plätze"/>
        <span>{{ location.capacity }}</span>
      </template>
      <template v-if="event.numberOfFavorites !== undefined">
        <img width="16" height="16" src="../../assets/img/StarFilled.png" alt="Favoriten"/>
        <span>{{ event.numberOfFavorites }}</span>
      </template>
    </div>
    <div class="track" v-if="track">
      <img width="16" height="16" :src="trackIcon" alt="Stream" title="Stream"/>
      <span>{{ track.names[this.$i18n.locale] }}</span>
    </div>
    <div class="room">
      <span style="margin-left: -2px;" class="language-icon">&#128172;</span>
      <span>{{ language.names[this.$i18n.locale] }}</span>
      <template v-if="event.simultan">{{ $t('simultan') }}</template>
      <img alt="" class="language-icon" :src="languageIcon">
    </div>
  </div>
</template>

<script>
  import Conference from '../../Conference'
  import Images from '../../Images'
  const unknownImage = require('@/assets/img/Unknown.png')
  import Moment from 'moment'

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
    name: 'scheduledEventIcons',
    props: ['event'],
    data () {
      return {
        locations: Conference.getAllLocations(),
        languages: Conference.getAllLanguages(),
        tracks: Conference.getAllTracks(),
        images: Images.getImages()
      }
    },
    computed: {
      durationInMinutes: function () {
        if (!this.event.start || !this.event.end) {
          return ''
        }
        var dateStart = new Date(this.event.start)
        var dateEnd = new Date(this.event.end)
        var millis = dateEnd - dateStart
        return millis / 1000 / 60
      },
      startDayTime: function () {
        return Moment(this.event.start).locale(this.$i18n.locale).format('dddd, Do MMM, HH:mm')
      },
      timeClass: function () {
        var dateStart = new Date(this.event.start)
        var dateEnd = new Date(this.event.end)
        var millis = dateEnd - dateStart
        return getTimeCategory(millis / 1000 / 60) === 'regular' ? 'time' : 'time-extra alternate'
      },
      location: function () {
        return this.locations[this.event.locationId]
      },
      locationName: function () {
        return this.locations[this.event.locationId].names[this.$i18n.locale]
      },
      language: function () {
        return this.languages[this.event.languageId]
      },
      languageIcon: function () {
        // TODO: different icon when this.event.simultan - seems to be broken in old app
        return require('@/assets/img/lang_' + this.languages[this.event.languageId].code + '.png')
      },
      track: function () {
        return this.tracks[this.event.trackId]
      },
      trackIcon: function () {
        var image = this.images.streamImages[this.event.trackId]
        if (!image) {
          image = unknownImage
        }
        return image
      }

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
