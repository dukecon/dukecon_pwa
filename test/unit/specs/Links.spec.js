import Vue from 'vue'
import sinon from 'sinon'
import Links from '@/components/footer/Links'
import { i18n } from '@/Internationalization.js'
import Conference from '../../../src/Conference'

describe('Links.vue', () => {
  var sandbox
  beforeEach(function () {
    sandbox = sinon.sandbox.create()
    i18n.locale = 'de'
  })

  afterEach(function () {
    sandbox.restore()
    i18n.locale = 'de'
  })

  it('should render links with content in both languages', done => {
    // given ...
    // ... a stubbed conference
    var callbackConference = sandbox.stub(Conference, 'getConference')
    var conference = {
      imprint: {},
      privacy: {},
      termsOfUse: {}
    }
    callbackConference.returns(conference)
    // ... a <links /> on a page
    const vm = new Vue({
      components: {
        Links
      },
      template: '<div><links></links></div>',
      i18n
    }).$mount()
    /* ******************** */
    // when ...
    // ... conference is loaded
    Vue.set(conference, 'imprint', {
      'de': 'https://www.javaland.eu/de/impressum/',
      'en': 'https://www.javaland.eu/en/imprint/'
    })
    Vue.set(conference, 'termsOfUse', {
      'de': 'https://www.javaland.eu/de/nutzungsbedingungen/',
      'en': 'https://www.javaland.eu/en/term-of-use/'
    })
    Vue.set(conference, 'privacy', {
      'de': 'https://www.javaland.eu/de/datenschutz/',
      'en': 'https://www.javaland.eu/en/privacy/'
    })
    /* ******************** */
    // then ...
    vm.$nextTick(() => {
      // ... data is shown
      expect(vm.$el.querySelector('.imprint').textContent).to.equal('Impressum')
      expect(vm.$el.querySelector('.imprint').href).to.equal('https://www.javaland.eu/de/impressum/')
      // ... text changes once language changes
      i18n.locale = 'en'
      vm.$nextTick(() => {
        expect(vm.$el.querySelector('.imprint').textContent).to.equal('Legal mentions')
        expect(vm.$el.querySelector('.imprint').href).to.equal('https://www.javaland.eu/en/imprint/')
        done()
      })
    })
  })
})
