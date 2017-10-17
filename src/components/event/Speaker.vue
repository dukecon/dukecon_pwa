<template>
  <div class="speaker-widget">
    <div class="speaker-content">
      <div class="speaker-overview">
        <div class="flexbox">
          <div class="speaker-portrait"><img alt="" :src='speakerImageUrl'></div>
          <div class="speaker-contact"><h2 class="darkLink">{{ speaker.name }}</h2>
            <div class="speaker-function">
              {{ speaker.function }} {{ speaker.company }}
            </div>
            <table>
              <tbody>
              <tr v-if="speaker.email">
                <th>E-Mail:</th>
                <td><a :href='"mailto:" + speaker.email'>{{ speaker.email }}</a></td>
              </tr>
              <tr v-if="speaker.website">
                <th>Web:</th>
                <td><a target="_blank" :href="speaker.website">{{speaker.website}}</a></td>
              </tr>
              <tr v-if="speaker.blog">
                <th>Blog:</th>
                <td><a target="_blank" :href="speaker.blog">{{speaker.blog}}</a></td>
              </tr>
              </tbody>
            </table>
            <div class="speaker-socialmedia" v-for="m in socialMedias">
            <span :class="'speaker-' + m.media">
              <a target="_blank" :href="m.url">
                <img :src="m.src" :alt="m.media"/>
              </a>
            </span>
            </div>
          </div>
        </div>
        <div id="speaker-bio">{{ speaker.bio }}</div>
      </div>
      <div class="speaker-talks">
        <h2>{{ $t(parentEventId ? 'other_speakertalks' : 'speakertalks') }}</h2>
        <div v-if="speakerEvents.length == 0">{{ $t('noOtherTalks') }}</div>
        <template v-for="e in speakerEvents">
          <event :event="e"/>
        </template>
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
    base = 'https://latest.dukecon.org/javaland/2018/'
  }

  var toUrl = function (media, url) {
    if (media === 'twitter') {
      if (!url.indexOf('http') === 0) {
        url = 'https://www.twitter.com/' + (url.indexOf('@') === 0 ? url.substr(1) : url)
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
          return s[m] !== undefined
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
