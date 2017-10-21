import axios from 'axios'
import Vue from 'vue'
import { groupBy } from 'lodash'

/* the following objects (events, conference) are the global data model for this application.
   They are read only for the users, but they will be updated asynchronously when the data is loaded, they might be
   updated with new data periodically as well. Use the references returned to bind them to your model. */
const refreshIntevalMs = 5000

let events

let eventsByDay

let speakers

let locations

let languages

let audiences

let tracks

let conference

let base = ''

let initialized = false

function getTalkUpdates () {
  axios.get(base + 'rest/eventsBooking/' + conference.id)
    .then(function (response) {
      response.data.forEach(val => {
        events[val.eventId].numberOfFavorites = val.numberOfFavorites
        events[val.eventId].fullyBooked = val.fullyBooked
      })
    })
}

function reset () {
  initialized = false

  events = {}

  eventsByDay = {}

  speakers = {}

  locations = {}

  languages = {}

  audiences = {}

  tracks = {}

  /* pre-initialize properties with an empty value to ease use in other components.
  Values will be updated once init.js has been loaded. */
  conference = {
    imprint: {},
    privacy: {},
    termsOfUse: {},
    homeUrl: null,
    homeTitle: null,
    authEnabled: false,
    name: null
  }
}

// ability to reset is needed for testing this component
reset()

// test if we are running in local served mode to test offline mode
if (window.location.href.indexOf('http://localhost:5000') !== -1) {
  base = 'https://latest.dukecon.org/javaland/2018/'
}

/**
 * Support lazy initialization of content to facilitate testing.
 */
const init = function () {
  if (initialized) {
    return
  }
  initialized = true
  axios.get(base + 'rest/init.json')
    .then(function (response) {
      for (const key in response.data) {
        if (response.data.hasOwnProperty(key)) {
          Vue.set(conference, key, response.data[key])
        }
        if (!conference.homeTitle) {
          conference.homeTitle = conference.name
        }
        document.title = conference.name
      }
      axios.get(base + 'rest/conferences/' + conference.id)
        .then(function (response) {
          response.data.events.forEach(v => {
            Vue.set(events, v.id, v)
          })
          response.data.speakers.forEach(v => {
            Vue.set(speakers, v.id, v)
          })
          response.data.metaData.locations.forEach(v => {
            Vue.set(locations, v.id, v)
          })
          response.data.metaData.languages.forEach(v => {
            Vue.set(languages, v.id, v)
          })
          response.data.metaData.audiences.forEach(v => {
            Vue.set(audiences, v.id, v)
          })
          response.data.metaData.tracks.forEach(v => {
            Vue.set(tracks, v.id, v)
          })
          let days = groupBy(events, function (event) { return event.start ? event.start.substr(0, 10) : null })
          Object.entries(days).forEach(e => {
            Vue.set(eventsByDay, e[0], e[1])
          })
          window.setInterval(getTalkUpdates, refreshIntevalMs)
        })
        .catch(function (error) {
          // it seems that we are working in development mode but are offline
          // (and we haven't tried the static path yet as it would otherwise lead to a loop)
          if (window.location.href.indexOf('http://localhost:8080') !== -1 && base.indexOf('static') === -1) {
            base = '/static/'
            initialized = false
            init()
          }
          console.log(error)
        })
    })
    .catch(function (error) {
      // it seems that we are working in development mode but are offline
      // (and we haven't tried the static path yet as it would otherwise lead to a loop)
      if (window.location.href.indexOf('http://localhost:8080') !== -1 && base.indexOf('static') === -1) {
        base = '/static/'
        initialized = false
        init()
      }
      console.log(error)
    })
}

export default class Conference {
  static getAllEvents () {
    init()
    return events
  }

  static getAllSpeakers () {
    init()
    return speakers
  }

  static getAllLocations () {
    init()
    return locations
  }

  static getAllLanguages () {
    init()
    return languages
  }

  static getAllAudiences () {
    init()
    return audiences
  }

  static getAllTracks () {
    init()
    return tracks
  }

  static getConference () {
    init()
    return conference
  }

  static getEventsByDay () {
    init()
    return eventsByDay
  }

  // use this for testing
  static _reset () {
    reset()
  }
}

