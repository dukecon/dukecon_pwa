<template>
  <div id="app">
    <link v-if="conference.id" rel="stylesheet" type="text/css" :href="baseUrl + conference.id + '/styles.css'" />
    <div class="header has-search">
      <h1 id="headertitle" class="darkBack reverse">
        <homeicon></homeicon>
        <backbutton></backbutton>
        <search></search>
        <div id="login-area" class="darkBack" v-if="conference.authEnabled">
          <login></login>
        </div>
        <div id="mainmenu-items" :class="{ darkBack: true, shown: mobileMenuOpen}">
          <talks></talks>
          <timetable></timetable>
          <speakers></speakers>
          <feedback></feedback>
          <conference-link></conference-link>
          <language></language>
        </div>
        <div id="mainmenu-button"><img @click="toggle" src="./assets/img/menu_24px.svg"></div>
      </h1>
    </div>
    <div id="loading" class="alternate" v-if="Object.keys(events).length === 0">
      &nbsp;
    </div>


    <!-- this keep-alive allows ultra-fast switching between views, especially the speakers page -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <footer>
      <links></links>
    </footer>
    <please-login></please-login>
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
      Links
    },
    name: 'app',
    data () {
      return {
        mobileMenuOpen: false,
        conference: Conference.getConference(),
        baseUrl: Conference.getBaseUrl(),
        events: Conference.getAllEvents()
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
    }
  }
</script>

<style>
</style>
