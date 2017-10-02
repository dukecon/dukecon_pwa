require('./assets/css/pure-min.css')
require('./assets/css/side-menu.css')
require('./assets/css/dukecon.less')
require('./assets/css/style.css')
// TODO load javaland style conditionally
require('./assets/css/javaland-style.css')
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import DukeconKeycloak from './DukeconKeycloak'
import Router from 'vue-router'
import Schedule from '@/components/Schedule'
import ScheduledEventPage from '@/components/event/ScheduledEventPage'
import SpeakerPage from '@/components/event/SpeakerPage'
import $ from 'jquery'
import { i18n } from './Internationalization.js'

Vue.config.productionTip = false

function initVue () {
  Vue.use(Router)
  const router = new Router({
    routes: [
      {
        path: '/',
        name: 'schedule',
        component: Schedule
      },
      {
        path: '/scheduledEvent/:eventId',
        name: 'scheduledEventPage',
        component: ScheduledEventPage
      },
      {
        path: '/speaker/:speakerId',
        name: 'speakerPage',
        component: SpeakerPage
      }
    ]
  })

  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: {App},
    i18n
  })
}

// keycloak will add an iframe. Therefore wait for DOM to be ready first
$(document).ready(function () {
  DukeconKeycloak.getKeycloak().init({onLoad: 'check-sso'}).success(function (authenticated) {
    // keycloak will do URL redirects. This interferes with Vue Router, therefore init Vue afterwards
    initVue()
  }).error(function () {
    console.log('failed to initialize keycloak - might be in testing mode')
    initVue()
  })
})

