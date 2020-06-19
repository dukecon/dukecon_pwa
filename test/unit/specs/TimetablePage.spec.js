import Vue from 'vue'
import TimetablePage from '@/components/timetable/TimetablePage'
import Router from 'vue-router'
import { i18n } from '@/Internationalization.js'
import Conference from '../../../src/Conference'
import minimalConferenceData from './minimalConferenceData.js'
import VueLazyload from 'vue-lazyload'

describe('TimetablePage.vue', () => {
  var sandbox
  beforeEach(function () {
    sandbox = sinon.sandbox.create()
    i18n.locale = 'de'
  })

  afterEach(function () {
    sandbox.restore()
    i18n.locale = 'de'
  })

  it('should render correct contents', done => {
    // given ...
    // .. defined speakers
    var callbackGetAllSpeakers = sandbox.stub(Conference, 'getAllSpeakers')
    var speakers = {}
    minimalConferenceData.data.speakers.forEach(v => {
      speakers[v.id] = v
    })
    callbackGetAllSpeakers.returns(speakers)
    // .. defined tracks
    var callbackGetAllLocations = sandbox.stub(Conference, 'getAllLocations')
    var locations = {}
    minimalConferenceData.data.metaData.locations.forEach(v => {
      locations[v.id] = v
    })
    callbackGetAllLocations.returns(locations)
    // .. defined tracks
    var callbackGetAllEvents = sandbox.stub(Conference, 'getAllEvents')
    var events = {}
    minimalConferenceData.data.events.forEach(v => {
      events[v.id] = v
    })
    callbackGetAllEvents.returns(events)
    // ... and a router
    Vue.use(Router)
    Vue.use(VueLazyload)
    const router = new Router({
      routes: [
        {
          path: '/scheduledEvent/:eventId',
          name: 'scheduledEventPage'
        },
        {
          path: '/speaker/:speakerId',
          name: 'speakerPage'
        }
      ]
    })
    // ... and a Vue instance with the component
    const vm = new Vue({
      components: {
        TimetablePage
      },
      template: '<div><timetable-page /></div>',
      router,
      i18n
    }).$mount()
    // then ...
    vm.$nextTick(() => {
      window.setTimeout(() => {
        // ... locations should be rendered
        // console.log(vm.$el.querySelector('#visualization').textContent)
        expect(vm.$el.querySelector('#visualization').textContent.indexOf('Wintergarten'))
          .to.equal(0)
        expect(vm.$el.querySelector('#ev-529697'))
          .to.not.equal(null)
        done()
        // TODO: currently the items don't render in PhantomJS, therefore I'm currently unable to test more
      }, 0)
    })
  })
})
