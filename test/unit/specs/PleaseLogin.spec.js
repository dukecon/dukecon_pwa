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
    const callbackFavourites = sandbox.stub(Favorites, 'getFavorites')
    var favourites = {
    }
    callbackFavourites.returns(favourites)
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
    chaiExpect(vm.$el.querySelector('#alert-window')).to.equal(null)
    // when ...
    // ... favourites changed
    Vue.set(favourites, '1', true)
    // ... wait for next rendering
    vm.$nextTick(() => {
      // then ...
      // ... alert box is shown
      chaiExpect(vm.$el.querySelector('#alert-window')).not.to.be.an('undefined')
      done()
    })
  })
})
