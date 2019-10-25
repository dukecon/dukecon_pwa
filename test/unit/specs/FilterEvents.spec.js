import Vue from 'vue'
import FilterEvents from '@/components/schedule/FilterEvents'
import { i18n } from '@/Internationalization.js'
import Conference from '../../../src/Conference'
import minimalConferenceData from './minimalConferenceData.js'
import Eventbus from '../../../src/Eventbus'

describe('FilterEvents.vue', () => {
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
    // ... and a Vue instance with the component
    Vue.use(Eventbus)
    const vm = new Vue({
      components: {
        FilterEvents
      },
      template: '<div><filter-events></filter-events></div>',
      i18n
    }).$mount()
    // then ...
    // ... item is shown
    expect(vm.$el.querySelector('.filter-settings > span > span').textContent)
      .to.equal('Filter-Optionen')
    expect(vm.$el.querySelector('.filter-box > div:nth-child(1) > div > a').textContent.trim())
      .to.equal('Zielgruppe')
  })
})
