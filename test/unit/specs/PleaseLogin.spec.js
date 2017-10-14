import Vue from 'vue'
import PleaseLogin from '@/components/PleaseLogin'
import { i18n } from '@/Internationalization.js'
import Eventbus from '../../../src/Eventbus'
import Favorites from '../../../src/Favourites'

describe('PleaseLogin.vue', () => {
  let sandbox
  beforeEach(function () {
    sandbox = sinon.sandbox.create()
  })

  afterEach(function () {
    sandbox.restore()
  })

  it('should render alert box on callback', done => {
    // given ...
    // ... a mocked Favorites
    let registerPleaseLoginCallback = sandbox.stub(Favorites, 'registerPleaseLoginCallback')
    // ... and a Vue instance with the component
    Vue.use(Eventbus)
    const vm = new Vue({
      components: {
        PleaseLogin
      },
      template: '<div><please-login></please-login></div>',
      i18n
    }).$mount()
    // ... alert box not visible
    expect(vm.$el.querySelector('#alert-window')).to.equal(null)
    // when ...
    // ... callback called
    expect(registerPleaseLoginCallback.called).to.equal(true)
    registerPleaseLoginCallback.getCalls()[0].args[0]()
    // ... wait for next rendering
    vm.$nextTick(() => {
      // then ...
      // ... alert box is shown
      expect(vm.$el.querySelector('#alert-window')).not.to.be.an('undefined')
      done()
    })
  })
})
