import 'babel-polyfill'
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import DukeconKeycloak from './DukeconKeycloak'
import VueRouter from 'vue-router'
import Schedule from '@/components/Schedule'
import ScheduledEventPage from '@/components/event/ScheduledEventPage'
import SpeakerPage from '@/components/event/SpeakerPage'
import SpeakersPage from '@/components/event/SpeakersPage'
import FeedbackPage from '@/components/FeedbackPage'
import { i18n } from './Internationalization.js'
import VueLazyload from 'vue-lazyload'
import Eventbus from './Eventbus.js'
import Favorites from './Favourites'
const TimetablePage = () => import(/* webpackChunkName: "vis" */ '@/components/timetable/TimetablePage.vue')

require('../node_modules/vis/dist/vis.css')
require('./assets/css/pure-min.css')
require('./assets/css/side-menu.css')
require('./assets/css/dukecon.less')
require('./assets/css/style.css')

Vue.config.productionTip = false
Vue.use(VueLazyload)

{
  // check if there is an old style search
  let href = window.location.href
  if (href.indexOf('?search=') !== -1 && href.indexOf('#/') === -1) {
    // there is a search query, but no hash based routing. Prepend the hash before the search.
    href = href.replace('?search=', '#/?search=')
    window.location.replace(href)
  }
}

let vueInitialized = false

function initVue () {
  if (vueInitialized === true) {
    return
  }
  vueInitialized = true
  Vue.use(VueRouter)

  // for each page, store the scroll position
  let positionStore = {}

  const router = new VueRouter({
    linkActiveClass: 'dark reverseBack active',
    scrollBehavior (to, from, savedPosition) {
      const oldPosition = positionStore[to.path]
      if (!oldPosition) {
        return {x: 0, y: 0}
      } else {
        return oldPosition
      }
    },
    routes: [
      {
        path: '/schedule',
        name: 'schedule',
        component: Schedule
      },
      {
        path: '/schedule/:day',
        name: 'scheduleWithDay',
        component: Schedule
      },
      {
        path: '/timetable',
        name: 'timetable',
        component: TimetablePage
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
      },
      {
        path: '/speakers',
        name: 'speakersPage',
        component: SpeakersPage
      },
      {
        path: '/feedback',
        name: 'feedbackPage',
        component: FeedbackPage
      },
      {
        path: '*',
        redirect: '/schedule'
      }
    ]
  })

  Vue.use(Eventbus)

  /* eslint-disable no-new */
  const app = new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: {App},
    i18n
  })

  /* record the scrolling on current route (works better as back-navigation scrolls to different position,
  and this would otherwise be recorded by beforeEach() */
  window.onscroll = function () {
    positionStore[app.$route.path] = {
      x: window.pageXOffset,
      y: window.pageYOffset
    }
  }
}

// keycloak will do URL redirects. This interferes with Vue Router
if (window.location.href.indexOf('?redirect_fragment') === -1) {
  // this is no redirect, so it is save to initialize Vue now
  initVue()
}

// show available storage space in log
// https://developers.google.com/web/updates/2017/08/estimating-available-storage-space
if ('storage' in navigator && 'estimate' in navigator.storage) {
  navigator.storage.estimate().then(({usage, quota}) => {
    console.log(`Using ${usage} out of ${quota} bytes.`)
  })
}

DukeconKeycloak.init().success(function (authenticated) {
  // getting the favorites will trigger the initial as we can ensure only here that the user has been logged in
  Favorites.getFavorites()
  initVue()
}).error(function () {
  initVue()
  DukeconKeycloak.handleErrorOnLogin()
})
