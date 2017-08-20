import axios from 'axios'
import Vue from 'vue'

const events = {}

axios.get('rest/conferences/javaland2017/events')
  .then(function (response) {
    response.data.forEach(v => {
      Vue.set(events, v.id, v)
    })
  })
  .catch(function (error) {
    console.log(error)
  })

export default class Events {
  static getEvent (eventId) {
    return events[eventId]
  }
  static getAllEvents () {
    return events
  }
}

