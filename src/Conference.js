import axios from 'axios'
import Vue from 'vue'

const events = {}

var init

var base = ''

// test if we are running in local served mode to test offline mode
if (window.location.href.indexOf('http://localhost:5000') !== -1) {
  base = 'https://latest.dukecon.org/javaland/2017/'
}

axios.get(base + 'rest/init.json')
  .then(function (response) {
    init = response.data
    axios.get(base + 'rest/conferences/' + init.id)
      .then(function (response) {
        response.data.events.forEach(v => {
          Vue.set(events, v.id, v)
        })
      })
      .catch(function (error) {
        console.log(error)
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

