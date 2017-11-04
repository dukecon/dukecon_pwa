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
import TimetablePage from '@/components/timetable/TimetablePage.vue'
import { i18n } from './Internationalization.js'
import VueLazyload from 'vue-lazyload'
import Eventbus from './Eventbus.js'
import Favorites from './Favourites'

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
  const router = new VueRouter({
    linkActiveClass: 'dark reverseBack active',
    routes: [
      {
        path: '/schedule',
        name: 'schedule',
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

  // for each page, store the scroll position
  var positionStore = {}

  /* record the scrolling on current route (works better as back-navigation scrolls to different position,
  and this would otherwise be recorded by beforeEach() */
  window.onscroll = function () {
    positionStore[app.$route.path] = {
      x: window.pageXOffset,
      y: window.pageYOffset
    }
  }

  // whenever the route changes, scroll to old position
  router.beforeEach((to, from, next) => {
    const oldPosition = positionStore[to.path]
    // restore position after next screen rendering
    app.$nextTick(() => {
      if (!oldPosition || (oldPosition.y === 0 && oldPosition.x === 0)) {
        window.scrollTo(0, 0)
      } else {
        // I found that rendering of the screen might take a little bit more time,
        // therefore wait a bit if we don't scroll to the top
        window.setTimeout(function () {
          window.scrollTo(oldPosition.x, oldPosition.y)
        }, 50)
      }
    })
    next()
  })
}

// keycloak will do URL redirects. This interferes with Vue Router
if (window.location.href.indexOf('?redirect_fragment') === -1) {
  // this is no redirect, so it is save to initialize Vue now
  initVue()
}

DukeconKeycloak.init().success(function (authenticated) {
  // getting the favorites will trigger the initial as we can ensure only here that the user has been logged in
  Favorites.getFavorites()
  initVue()
}).error(function () {
  console.log('failed to initialize keycloak - might be in testing mode')
  initVue()
})

