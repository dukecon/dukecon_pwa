import Vue from 'vue'
import ScheduledEvent from '@/components/event/ScheduledEvent'
import Router from 'vue-router'
import { i18n } from '@/Internationalization.js'
import Conference from '../../../src/Conference'
import minimalConferenceData from './minimalConferenceData.js'

describe('ScheduledEvent.vue', () => {
  var sandbox
  beforeEach(function () {
    sandbox = sinon.sandbox.create()
    i18n.locale = 'de'
  })

  afterEach(function () {
    sandbox.restore()
    i18n.locale = 'de'
  })

  it('should render correct contents', () => {
    // given ...
    // .. defined speakers
    var callbackGetAllSpeakers = sandbox.stub(Conference, 'getAllSpeakers')
    var speakers = {}
    minimalConferenceData.data.speakers.forEach(v => {
      speakers[v.id] = v
    })
    callbackGetAllSpeakers.returns(speakers)
    // .. defined tracks
    var callbackGetAllTracks = sandbox.stub(Conference, 'getAllTracks')
    var tracks = {}
    minimalConferenceData.data.metaData.tracks.forEach(v => {
      tracks[v.id] = v
    })
    callbackGetAllTracks.returns(tracks)
    // .. defined languages
    var callbackGetAllLanguages = sandbox.stub(Conference, 'getAllLanguages')
    var languages = {}
    minimalConferenceData.data.metaData.languages.forEach(v => {
      languages[v.id] = v
    })
    callbackGetAllLanguages.returns(languages)
    // .. defined locations
    var callbackGetAllLocations = sandbox.stub(Conference, 'getAllLocations')
    var locations = {}
    minimalConferenceData.data.metaData.locations.forEach(v => {
      locations[v.id] = v
    })
    callbackGetAllLocations.returns(locations)
    // .. defined audiences
    var callbackGetAllAudiences = sandbox.stub(Conference, 'getAllAudiences')
    var audiences = {}
    minimalConferenceData.data.metaData.audiences.forEach(v => {
      audiences[v.id] = v
    })
    callbackGetAllAudiences.returns(audiences)
    // .. any event
    var anEvent = minimalConferenceData.data.events[0]
    // ... and a router
    Vue.use(Router)
    const router = new Router({
      routes: [
        {
          path: '/speaker/:speakerId',
          name: 'speakerPage'
        }
      ]
    })
    // ... and a Vue instance with the component
    const vm = new Vue({
      components: {
        ScheduledEvent
      },
      template: '<div><scheduled-event :event="event"></scheduled-event></div>',
      data () {
        return {
          event: anEvent
        }
      },
      router,
      i18n
    }).$mount()
    // then ...
    // ... item is shown
    expect(vm.$el.querySelector('.content span').textContent)
      .to.equal('Fallacies of Distributed Computing: What If Networks Fail?')
    expect(vm.$el.querySelector('.speaker-contact h2').textContent)
      .to.equal('Bert Ertman')
    expect(vm.$el.querySelector('.time').textContent)
      .to.contain('Dienstag, 28. März, 14:00 - 14:40')
    expect(vm.$el.querySelector('.as-favorite > span').textContent)
      .to.equal('Als Favorit speichern')
  })
})
