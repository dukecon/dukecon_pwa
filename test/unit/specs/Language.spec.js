import Vue from 'vue'
import Language from '@/components/navbar/Language'
import { i18n } from '@/Internationalization.js'

describe('Language.vue', () => {
  beforeEach(function () {
    i18n.locale = 'de'
  })
  afterEach(function () {
    i18n.locale = 'de'
  })

  it('should switch the locale from de to en', () => {
    const vm = new Vue({
      components: {
        Language
      },
      template: '<div><language></language></div>',
      i18n
    }).$mount()
    expect(vm.$i18n.locale).to.equal('de')
    vm.$i18n.locale = 'de'
    vm.$el.querySelector('a').click()
    expect(vm.$i18n.locale).to.equal('en')
  })
})
