import Vue from 'vue'
import Schedule from '@/components/Schedule'
import Router from 'vue-router'

describe('Schedule.vue', () => {
  it('should render correct contents', () => {
    // given ...
    // ... and a router
    Vue.use(Router)
    const router = new Router({
      routes: [
        {
          path: '/scheduledEvent/:eventId',
          name: 'scheduledEvent'
        }
      ]
    })
    // ... and a Vue instance with the component
    const vm = new Vue({
      components: {
        Schedule
      },
      template: '<div><schedule></schedule></div>',
      router
    }).$mount()
    // then ...
    // ... item is shown
    expect(vm.$el.querySelector('.schedule h2').textContent)
      .to.equal('Schedule')
    // TODO: mock conference to see that events are properly shown
  })
})
