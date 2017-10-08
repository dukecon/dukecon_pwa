import Vue from 'vue'
import Schedule from '@/components/Schedule'
import Router from 'vue-router'
import { i18n } from '@/Internationalization.js'
import Eventbus from '../../../src/Eventbus'

describe('Schedule.vue', () => {
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
    // ... and a router
    Vue.use(Router)
    Vue.use(Eventbus)
    const router = new Router({
      routes: [
        {
          path: '/scheduledEvent/:eventId',
          name: 'scheduledEventPage'
        }
      ]
    })
    const vm = new Vue({
      components: {
        Schedule
      },
      template: '<div><schedule></schedule></div>',
      router,
      i18n
    }).$mount()
    // then ...
    // ... item is shown
    expect(vm.$el.querySelector('.schedule h2').textContent)
      .to.equal('Schedule')
    // TODO: mock conference to see that events are properly shown
  })
})
