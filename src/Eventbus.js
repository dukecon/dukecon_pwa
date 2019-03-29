import Vue from 'vue'

const eventbus = new Vue()

// flag to prevent double initialization i.e. in unit tests
var installed = false

export default class Eventbus {
  static install (vue) {
    if (!installed) {
      vue.mixin({
        computed: {
          eventbus () {
            return eventbus
          }
        }
      })
      installed = true
    }
  }
}
