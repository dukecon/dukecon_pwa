// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import DukeconKeycloak from './DukeconKeycloak'
import Router from 'vue-router'
import Schedule from '@/components/Schedule'
import ScheduledEvent from '@/components/ScheduledEvent'
import $ from 'jquery'

Vue.config.productionTip = false

function initVue () {
  Vue.use(Router)
  var router = new Router({
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
    components: {App}
  })
}

// keycloak will add an iframe. Therefore wait for DOM to be ready first
$(document).ready(function () {
  DukeconKeycloak.getKeycloak().init({onLoad: 'check-sso'}).success(function (authenticated) {
    // keycloak will do URL redirects. This interferes with Vue Router, therefore init Vue afterwards
    initVue()
  }).error(function () {
    alert('failed to initialize')
  })
})

