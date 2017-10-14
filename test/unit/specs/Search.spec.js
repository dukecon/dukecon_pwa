import Vue from 'vue'
import Search from '@/components/navbar/Search'
import { i18n } from '@/Internationalization.js'
import Eventbus from '../../../src/Eventbus'
import Router from 'vue-router'

describe('Search.vue', () => {
  var sandbox
  beforeEach(function () {
    sandbox = sinon.sandbox.create()
    i18n.locale = 'de'
  })

  afterEach(function () {
    sandbox.restore()
    i18n.locale = 'de'
  })

  it('should not render search box by default', () => {
    // given ...
    // ... and a Vue instance with the component
    Vue.use(Eventbus)
    Vue.use(Router)
    const router = new Router({})
    const vm = new Vue({
      components: {
        Search
      },
      template: '<div><search></search></div>',
      i18n,
      router
    }).$mount()
    // then ...
    // ... item is undefined
    expect(vm.$el.querySelector('#search-area > input')).to.equal(null)
  })

  it('should render search box if visibility is set to true', done => {
    // given ...
    // ... and a Vue instance with the component
    Vue.use(Eventbus)
    Vue.use(Router)
    const router = new Router({})
    const vm = new Vue({
      components: {
        Search
      },
      template: '<div><search></search></div>',
      i18n,
      router
    }).$mount()
    // ... search box not visible
    expect(vm.$el.querySelector('#search-area > input')).to.equal(null)
    // when ...
    // ... send visible event
    vm.eventbus.$emit('search.visible', true)
    vm.$nextTick(() => {
      // then ...
      // ... search box is shown
      expect(vm.$el.querySelector('#search-area > input')).to.not.be.an('undefined')
      // ... Placeholder is Suchen
      expect(vm.$el.querySelector('#search-area > input').attributes.placeholder.value).to.equal('Suchen')
      done()
    })
  })
})
