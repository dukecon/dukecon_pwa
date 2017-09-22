import Vue from 'vue'
import sinon from 'sinon'
import Homeicon from '@/components/navbar/Homeicon'
import Images from '../../../src/Images'
import Router from 'vue-router'

describe('Homeicon.vue', () => {
  let sandbox
  beforeEach(function () {
    sandbox = sinon.sandbox.create()
  })

  afterEach(function () {
    sandbox.restore()
  })

  it('should show the image and the link', done => {
    // given ...
    // ... a stubbed image resource
    const callbackImage = sandbox.stub(Images, 'getImages')
    const images = {
      conferenceImage: 'empty'
    }
    callbackImage.returns(images)
    // ... and a router
    Vue.use(Router)
    const router = new Router({
    })
    // ... and a Vue instance with the component
    const vm = new Vue({
      components: {
        Homeicon
      },
      template: '<div><homeicon></homeicon></div>',
      router
    }).$mount()
    /* ******************** */
    // when ...
    // ... conference is loaded
    Vue.set(images, 'conferenceImage', 'ci')
    /* ******************** */
    // then ...
    vm.$nextTick(() => {
      // ... data is shown
      expect(vm.$el.querySelector('img').src).to.include('/ci')
      done()
    })
  })
})
