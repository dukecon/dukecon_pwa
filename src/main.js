require('./assets/css/style.css')
require('./assets/css/side-menu.css')
// TODO load javaland style conditionally
require('./assets/css/javaland-style.css')
require('./assets/css/dukecon.less')
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import DukeconKeycloak from './DukeconKeycloak'
import Router from 'vue-router'
import Schedule from '@/components/Schedule'
import ScheduledEvent from '@/components/ScheduledEvent'
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
        name: 'scheduledEvent',
        component: ScheduledEvent
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

