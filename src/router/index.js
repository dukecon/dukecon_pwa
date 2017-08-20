import Vue from 'vue'
import Router from 'vue-router'
import Schedule from '@/components/Schedule'
import ScheduledEvent from '@/components/ScheduledEvent'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'schedule',
      component: Schedule
    },
    {
      path: '/scheduledEvent/:eventId',
      name: 'scheduledEvent',
      component: ScheduledEvent
    }
  ]
})
