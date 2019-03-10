<template>
  <div class="speaker-widget">
    <div class="speaker-content">
      <div class="speaker-overview">
        <div class="flexbox">
          <div class="speaker-portrait"><img alt="" :src='speakerImageUrl'></div>
          <div class="speaker-contact">
            <h2 class="darkLink">
              <router-link :to="{ name: 'speakerPage', params: { speakerId: speaker.id }}" class="speaker-link">{{ speaker.name }}</router-link>
            </h2>
            <div class="speaker-function">
              {{ speaker.function }} {{ speaker.company }}
            </div>
            <table>
              <tbody>
              <tr v-if="speaker.email">
                <th>E-Mail:</th>
                <td><a :href='"mailto:" + speaker.email'>{{ speaker.email }}</a></td>
              </tr>
              <tr v-if="speaker.website && speaker.website !== 'http://'">
                <th>Web:</th>
                <td><a target="_blank" :href="speakerWeblink">{{speaker.website}}</a></td>
              </tr>
              <tr v-if="speaker.blog">
                <th>Blog:</th>
                <td><a target="_blank" :href="speaker.blog">{{speaker.blog}}</a></td>
              </tr>
              </tbody>
            </table>
            <div class="speaker-socialmedia">
              <a v-for="m in socialMedias" :key="m.media" target="_blank" :href="m.url">
                <img :src="m.src" :alt="m.media"/>
              </a>
            </div>
          </div>
        </div>
        <div id="speaker-bio">{{ speaker.bio }}</div>
      </div>
      <div class="speaker-talks">
        <h2>{{ $t(parentEventId ? 'other_speakertalks' : 'speakertalks') }}</h2>
        <div v-if="speakerEvents.length == 0">{{ $t('noOtherTalks') }}</div>
        <event v-for="e in speakerEvents" :event="e" :key="e.id"/>
      </div>
    </div>
  </div>
</template>

<script>
import Conference from '../../Conference'
import Event from './Event.vue'

var base = ''

// test if we are running in local served mode to test offline mode
if (window.location.href.indexOf('http://localhost:5000') !== -1) {
  base = 'https://latest.dukecon.org/javaland/2019/'
}

var toUrl = function (media, url) {
  if (url.indexOf('http://') !== 0 && url.indexOf('https://') !== 0) {
    if (media === 'twitter') {
      url = 'https://twitter.com/' + (url.indexOf('@') === 0 ? url.substr(1) : url)
    } else {
      url = 'http://' + url
    }
  }
  return url
}
export default {
  components: {Event},
  name: 'speaker',
  props: ['speaker', 'parentEventId'],
  data () {
    var s = this.speaker
    var ms = ['facebook', 'googleplus', 'instagram', 'linkedin', 'pinterest', 'twitter', 'xing', 'youtube']
      .filter(m => {
        return s[m] !== undefined && s[m] !== 'http://'
      }).map(m => {
        return {
          media: m,
          url: toUrl(m, s[m]),
          src: require('@/assets/img/social_' + m + '.svg')
        }
      })
    return {
      socialMedias: ms,
      events: Conference.getAllEvents()
    }
  },
  computed: {
    speakerWeblink: function () {
      return toUrl('web', this.speaker.website)
    },
    speakerImageUrl: function () {
      if (this.speaker.photoId) {
        return base + 'rest/speaker/images/' + this.speaker.photoId
      } else {
        return require('@/assets/img/UnknownUser.png')
      }
    },
    speakerEvents: function () {
      return this.speaker.eventIds
        .filter(e => { return e !== this.parentEventId })
        .map(e => this.events[e])
        .filter(e => { return e !== undefined })
    }
  }
}
</script>
