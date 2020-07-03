import Vue from 'vue'
import Language from '@/components/navbar/Language'
import { i18n } from '@/Internationalization.js'
import Settings from '../../../src/Settings'

describe('Language.vue', () => {
  beforeEach(function () {
    Settings.saveSetting('dukecon_language', 'de')
    i18n.locale = 'de'
  })
  afterEach(function () {
    Settings.saveSetting('dukecon_language', 'de')
    i18n.locale = 'de'
  })

  xit('should switch the locale from de to en', async () => {
    const vm = new Vue({
      components: {
        Language
      },
      template: '<div><language></language></div>',
      i18n
    }).$mount()

    chaiExpect(vm.$i18n.locale).to.equal('de')
    vm.$i18n.locale = 'de'
    vm.$el.querySelector('a').click()
    chaiExpect(vm.$i18n.locale).to.equal('en')
  })
})
