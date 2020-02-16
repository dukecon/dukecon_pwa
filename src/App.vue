<template>
  <div id="app">
    <link v-if="conference.id" rel="stylesheet" type="text/css" :href="baseUrl + conference.id + '/styles.css'" />
    <div class="header has-search">
      <h1 id="headertitle" class="darkBack reverse">
        <homeicon></homeicon>
        <backbutton></backbutton>
        <search></search>
        <login></login>
        <a id="mainmenu-button"
           @click.prevent="toggle"
           href="#"
           :title="mobileMenuOpen ? $t('menu.close') : $t('menu.open')">
          <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
          </svg>
        </a>
        <div id="mainmenu-items" :class="{ darkBack: true, shown: mobileMenuOpen}">
          <talks></talks>
          <timetable></timetable>
          <speakers></speakers>
          <feedback></feedback>
          <conference-link></conference-link>
          <language></language>
        </div>
      </h1>
    </div>
    <div id="loading" class="alternate" v-if="conference.loadingFinished === false && conference.loadingFailed === false">
      &nbsp;
    </div>
    <div class="nothingtoshow alternate" v-if="Object.keys(events).length === 0 && conference.loadingFinished === true">
      <span>{{$t('emptyConference')}}</span>
    </div>
    <div class="nothingtoshow alternate" v-if="conference.loadingFailed === true">
      <span>{{$t('notExistingConference')}}</span>
    </div>

    <!-- this keep-alive allows ultra-fast switching between views, especially the speakers page -->
    <keep-alive exclude="timetable-page">
      <router-view></router-view>
    </keep-alive>
    <footer>
      <links></links>
    </footer>
    <please-login></please-login>
    <message-banner show-for-secs="3"></message-banner>
  </div>
</template>

<script>
import Language from './components/navbar/Language.vue'
import Login from './components/navbar/Login.vue'
import Links from './components/footer/Links.vue'
import Homeicon from './components/navbar/Homeicon.vue'
import Talks from './components/navbar/Talks.vue'
import Speakers from './components/navbar/Speakers.vue'
import Feedback from './components/navbar/Feedback.vue'
import ConferenceLink from './components/navbar/Conference.vue'
import Backbutton from './components/navbar/Backbutton.vue'
import Search from './components/navbar/Search.vue'
import Conference from './Conference'
import Timetable from './components/navbar/Timetable.vue'
import PleaseLogin from './components/PleaseLogin.vue'
import MessageBanner from './components/MessageBanner.vue'

export default {
  components: {
    PleaseLogin,
    Timetable,
    Backbutton,
    Search,
    ConferenceLink,
    Feedback,
    Speakers,
    Talks,
    Homeicon,
    Login,
    Language,
    Links,
    MessageBanner
  },
  name: 'app',
  data () {
    return {
      mobileMenuOpen: false,
      conference: Conference.getConference(),
      events: Conference.getAllEvents()
    }
  },
  computed: {
    baseUrl: function () {
      return Conference.getBaseUrl()
    }
  },
  created () {
    // ensure the mobile menu is closed on every navigation
    this.$router.beforeEach((to, from, next) => {
      this.mobileMenuOpen = false
      next()
    })
  },
  methods: {
    toggle: function () {
      this.mobileMenuOpen = !this.mobileMenuOpen
    }
  },
  watch: {
    '$i18n.locale': function () {
      this.mobileMenuOpen = false
    },
    conference: {
      handler () {
        if (this.conference.loadingFailed) {
          console.log('loading failed')
          this.eventbus.$emit('message.popup', { message: 'Could not initialize', error: true })
        }
      },
      immediate: true,
      deep: true
    }
  }
}
</script>

<style>
</style>
