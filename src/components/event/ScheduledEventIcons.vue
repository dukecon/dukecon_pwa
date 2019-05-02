<template>
  <div class="scheduled-event-icons">
    <div :class="timeClass">
      <svg style="fill: #777" version="1.1" id="Ebene_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
           width="16px" height="16px" viewBox="0 0 56.693 56.693" enable-background="new 0 0 56.693 56.693" xml:space="preserve">
          <g>
            <path d="M18.061,6.672c0,1.208-0.979,2.188-2.188,2.188l0,0c-1.208,0-2.188-0.979-2.188-2.188V2.188
              C13.684,0.98,14.664,0,15.873,0l0,0c1.208,0,2.188,0.979,2.188,2.188V6.672z"/>
            <path d="M43.008,6.672c0,1.208-0.979,2.188-2.188,2.188l0,0c-1.208,0-2.188-0.979-2.188-2.188V2.188
              C38.632,0.98,39.611,0,40.82,0l0,0c1.208,0,2.188,0.979,2.188,2.188V6.672z"/>
          </g>
                  <g>
            <path d="M18.061,6.672c0,1.208-0.979,2.188-2.188,2.188l0,0c-1.208,0-2.188-0.979-2.188-2.188V2.188
              C13.684,0.98,14.664,0,15.873,0l0,0c1.208,0,2.188,0.979,2.188,2.188V6.672z"/>
                    <path d="M53.858,5.67h-8.016v1.002c0,2.77-2.253,5.022-5.021,5.022c-2.77,0-5.022-2.253-5.022-5.022V5.67H20.895
              v1.002c0,2.77-2.254,5.022-5.022,5.022S10.85,9.441,10.85,6.672V5.67H2.834C1.268,5.67,0,6.939,0,8.504v45.355
              c0,1.564,1.269,2.834,2.834,2.834h51.024c1.564,0,2.835-1.27,2.835-2.834V8.504C56.693,6.939,55.424,5.67,53.858,5.67z
               M52.441,48.756c0,1.252-1.017,2.269-2.27,2.269H6.518c-1.252,0-2.268-1.017-2.268-2.269v-29.48c0-1.252,1.015-2.269,2.268-2.269
              h43.653c1.253,0,2.27,1.016,2.27,2.269V48.756z"/>
                    <path d="M43.008,6.672c0,1.208-0.979,2.188-2.188,2.188l0,0c-1.208,0-2.188-0.979-2.188-2.188V2.188
              C38.632,0.98,39.611,0,40.82,0l0,0c1.208,0,2.188,0.979,2.188,2.188V6.672z"/>
          </g>
          <g opacity="0.3">
            <rect x="24.418" y="20.693" width="7.851" height="27.1"/>
                    <rect x="37.176" y="20.693" width="7.853" height="27.1"/>
                    <rect x="11.664" y="20.693" width="7.849" height="27.1"/>
          </g>
          </svg>

      {{ startDayTime }} - {{endTime}}
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

function getTimeCategory (duration, threshold) {
  if (typeof duration === 'undefined' || (duration > 30 && duration <= threshold)) {
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
      favourites: Favourites.getFavorites(),
      longTalkThresholdMinutes: Conference.getConference().longTalkThresholdMinutes
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
      switch (getTimeCategory(this.event.durationInMinutes, this.longTalkThresholdMinutes)) {
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
<style lang="less" scoped>
  .scheduled-event-icons > div {
    padding-top: 4px;
  }
</style>
