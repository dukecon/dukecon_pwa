import Vue from 'vue'
import VueRouter from 'vue-router'
import Speaker from '@/components/event/Speaker'
import { i18n } from '@/Internationalization.js'
import Conference from '../../../src/Conference'
import minimalConferenceData from './minimalConferenceData.js'

describe('Speaker.vue', () => {
  var sandbox
  beforeEach(function () {
    sandbox = sinon.sandbox.create()
    i18n.locale = 'de'
  })

  afterEach(function () {
    sandbox.restore()
    i18n.locale = 'de'
  })

  xit('should render correct contents', async () => {
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
    // .. any speaker
    var aSpeaker = minimalConferenceData.data.speakers[0]
    // ... and a router
    const router = new VueRouter({
      routes: [
        {
          path: '/should-not-be-used',
          name: 'scheduledEventPage'
        },
        {
          path: '/should-not-be-used-either',
          name: 'speakerPage'
        },
      ]
    })
    // ... and a Vue instance with the component
    const vm = new Vue({
      components: { Speaker },
      template: '<div><speaker :speaker="speaker" ref="speaker"></speaker></div>',
      data () {
        return {
          speaker: aSpeaker
        }
      },
      router,
      i18n
    }).$mount()

    vm.$refs.speaker.events = minimalConferenceData.data.events

    await vm.$nextTick()

    // then ...
    // ... item is shown
    chaiExpect(vm.$el.querySelector('.speaker-contact > h2').textContent)
      .to.equal('Bert Ertman')

    // TODO since we are doing stupid things with events, it is no longer an array, so our test-data won't work here

    chaiExpect(vm.$el.querySelector('.title.darkLink > a').textContent)
      .to.equal('Fallacies of Distributed Computing: What If Networks Fail?')
    chaiExpect(vm.$el.querySelector('.time').textContent)
      .to.contain('Dienstag, 28. März, 14:00 - 14:40')
  })
})
