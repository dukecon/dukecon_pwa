import Vue from 'vue'
import Twitter from '@/components/event/Twitter'

describe('Twitter.vue', () => {
  it('should render twitter for handle "@test"', () => {
    const vm = new Vue({
      components: {
        Twitter
      },
      template: '<div><twitter url="@test"></twitter></div>'
    }).$mount()
    expect(vm.$el.querySelector('a').textContent).to.equal('@test')
    expect(vm.$el.querySelector('a').href).to.equal('https://twitter.com/test')
  })

  it('should render twitter for handle "test"', () => {
    const vm = new Vue({
      components: {
        Twitter
      },
      template: '<div><twitter url="test"></twitter></div>'
    }).$mount()
    expect(vm.$el.querySelector('a').textContent).to.equal('@test')
    expect(vm.$el.querySelector('a').href).to.equal('https://twitter.com/test')
  })

  it('should render twitter for handle "twitter.com/test"', () => {
    const vm = new Vue({
      components: {
        Twitter
      },
      template: '<div><twitter url="twitter.com/test"></twitter></div>'
    }).$mount()
    expect(vm.$el.querySelector('a').textContent).to.equal('@test')
    expect(vm.$el.querySelector('a').href).to.equal('https://twitter.com/test')
  })

  it('should render twitter for handle "https://twitter.com/test"', () => {
    const vm = new Vue({
      components: {
        Twitter
      },
      template: '<div><twitter url="https://twitter.com/test"></twitter></div>'
    }).$mount()
    expect(vm.$el.querySelector('a').textContent).to.equal('@test')
    expect(vm.$el.querySelector('a').href).to.equal('https://twitter.com/test')
  })

  it('should render twitter for handle "https://twitter.com/test/"', () => {
    const vm = new Vue({
      components: {
        Twitter
      },
      template: '<div><twitter url="https://twitter.com/test/"></twitter></div>'
    }).$mount()
    expect(vm.$el.querySelector('a').textContent).to.equal('@test')
    expect(vm.$el.querySelector('a').href).to.equal('https://twitter.com/test/')
  })

  it('should render twitter for handle "https://twitter.com/test?lang=..."', () => {
    const vm = new Vue({
      components: {
        Twitter
      },
      template: '<div><twitter url="https://twitter.com/test?lang=..."></twitter></div>'
    }).$mount()
    expect(vm.$el.querySelector('a').textContent).to.equal('@test')
    expect(vm.$el.querySelector('a').href).to.equal('https://twitter.com/test?lang=...')
  })
})
