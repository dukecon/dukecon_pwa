<template>
  <div>
    <div :class="timeClass">
      <img width="16" height="16" src="../../assets/img/Clock.png" alt="Startzeit" title="Startzeit"/>
      {{ startDayTime }} -  {{endTime}}
    </div>
    <div class="room">
      <img width="16" height="16" src="../../assets/img/Home.png" alt="Raum" title="Raum"/>
      {{ locationName }}
      <template v-if="location.capacity">
        &nbsp;&nbsp;
        <img width="16" height="16" src="../../assets/img/chair.svg" alt="Plätze"/>
        {{ location.capacity }}
      </template>
      <template v-if="numberOfFavorites !== undefined">
        <img width="16" height="16" src="../../assets/img/StarFilled.png" alt="Favoriten"/>
        {{ numberOfFavorites }}
      </template>
    </div>
    <div class="track" v-if="track">
      <img width="16" height="16" :src="trackIcon" alt="Stream" title="Stream"/>
      {{ track.names[$i18n.locale] }}
    </div>
    <div class="room" v-if="mode !== 'grid' && Object.keys(languages).length > 1">
      <span style="margin-left: -2px;" class="language-icon">&#128172;</span>
      {{ language.names[$i18n.locale] }}
      <template v-if="event.simultan">{{ $t('simultan') }}</template>
      <img alt="" class="language-icon" :src="languageIcon">
    </div>
  </div>
</template>

<script>
import Conference from '../../Conference'
import Images from '../../Images'
import Favourites from '../../Favourites'
import Moment from 'moment'

const unknownImage = require('@/assets/img/Unknown.png')

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
  name: 'scheduledEventIcons',
  props: ['event', 'mode'],
  data () {
    return {
      locations: Conference.getAllLocations(),
      languages: Conference.getAllLanguages(),
      tracks: Conference.getAllTracks(),
      images: Images.getImages(),
      favourites: Favourites.getFavorites()
    }
  },
  computed: {
    startDayTime: function () {
      return Moment(this.event.start).locale(this.$i18n.locale).format('dddd, Do MMM, HH:mm')
    },
    endTime: function () {
      return Moment(this.event.end).locale(this.$i18n.locale).format('HH:mm')
    },
    timeClass: function () {
      switch (getTimeCategory(this.event.durationInMinutes)) {
        case 'long':
          return 'time-extra alternate'
        case 'short':
          return 'time'
        default:
          return 'time'
      }
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
      let prefix = ''
      if (!this.event.simultan) {
        prefix += 'lang_'
      }
      return require('@/assets/img/' + prefix + this.languages[this.event.languageId].code + '.png')
    },
    track: function () {
      return this.tracks[this.event.trackId]
    },
    trackIcon: function () {
      let image = this.images.streamImages[this.event.trackId]
      if (!image) {
        image = unknownImage
      }
      return image
    },
    numberOfFavorites: function () {
      return this.event.numberOfFavorites
    }
  }
}
</script>
