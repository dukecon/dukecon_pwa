import Vue from 'vue'
import Schedule from '@/components/Schedule'

describe('Schedule.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Schedule)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.schedule h1').textContent)
      .to.equal('Schedule')
  })
})
