import axios from 'axios'
import Vue from 'vue'
import groupBy from 'lodash-es/groupBy'
import Favorites from './Favourites'
import moment from 'moment'

const refreshIntervalFavoritesMs = 90 * 1000
const refreshIntervalEventsMs = 10 * 60 * 1000
// for the conferences we use a version cached by the service worker.
// We always get the "fastest" version, that is the version in the local
// service worker cache. Any request will get the current version of the
// cache and update the cache in the background.
// We need a second request to get the most up-to-date version.
const refreshToBustCache = 10 * 1000

/* the following objects (events, conference) are the global data model for this application.
   They are read only for the users, but they will be updated asynchronously when the data is loaded, they might be
   updated with new data periodically as well. Use the references returned to bind them to your model. */
let events

let eventsByDay

let speakers

let locations

let languages

let audiences

let tracks

let conference

let base = ''
if (window.location.href.indexOf('http://localhost:8080') !== -1) {
  // uncomment the following line if you want to use static data for local development
  // base = '/static/'
}

let initialized = false

let talkUpdateIsRunning = false

let eventUpdateIntervalHandle

let favoritesUpdateIntervalHandle

function getFavoritesAndBookingsUpdates () {
  if (talkUpdateIsRunning) {
    return
  }
  talkUpdateIsRunning = true
  axios.get(base + 'rest/eventsBooking/' + getConferenceId())
    .then(function (response) {
      response.data.forEach(val => {
        if (events[val.eventId]) {
          // we'll accept number of favorites from the backend only if authentication is enabled
          // or if it was present before
          if (conference.authEnabled || events[val.eventId].numberOfFavorites) {
            events[val.eventId].numberOfFavorites = val.numberOfFavorites
          }
          events[val.eventId].fullyBooked = val.fullyBooked
        }
      })
      Favorites.updateEventsWithLocalFavorites()
      talkUpdateIsRunning = false
    })
    .catch(() => {
      talkUpdateIsRunning = false
    })
}

/**
 * Returns current conference id and concats suffix when in fallback mode
 *
 * @returns {string}
 */
function getConferenceId () {
  return base.indexOf('static') === -1 ? conference.id : conference.id + '.json'
}

function durationInMinutes (event) {
  if (!event.start || !event.end) {
    return undefined
  }
  const dateStart = new Date(event.start)
  const dateEnd = new Date(event.end)
  const millis = dateEnd - dateStart
  return millis / 1000 / 60
}

function enrichEventData (event) {
  // in case event spans several time slots
  event.startOfSlice = event.start
  event.endOfSlice = null
  // id used in HTML to keep it unique
  event.htmlId = event.id
  event.durationInMinutes = durationInMinutes(event)
  event.showInTimetable = true
}

function getDateOnly (dateString) {
  return moment(dateString).format('YYYY-MM-DD')
}

function splitSingleEvent (event, timeSlotsOnSameDay) {
  let split = []
  split.push(event)
  if (event.durationInMinutes > 60) {
    for (let t in timeSlotsOnSameDay) {
      const timeslot = timeSlotsOnSameDay[t]
      const timeSlotNext = timeSlotsOnSameDay[parseInt(t) + 1]
      if (moment(timeslot.time).isAfter(moment(event.start)) && moment(timeslot.time).isBefore(event.end)) {
        let eventSlice = JSON.parse(JSON.stringify(event))
        eventSlice.startOfSlice = timeslot.time
        if (timeSlotNext) {
          eventSlice.endOfSlice = timeSlotNext.time
        }
        eventSlice.htmlId = eventSlice.id + '_' + timeslot.timeslot
        eventSlice.showInTimetable = false
        split.push(eventSlice)
      }
    }
  }
  return split
}

function splitLongEvents (events, timeslots) {
  let splitEvents = []
  events.forEach(e => {
    const timeSlotsOnSameDay = timeslots[getDateOnly(e.start)]
    splitEvents.push(...splitSingleEvent(e, timeSlotsOnSameDay))
  })
  return splitEvents.sort((eventA, eventB) => {
    return eventA.startOfSlice - eventB.startOfSlice
  })
}

function calculateTimeslots (events) {
  const groupedTimes = Object.keys(groupBy(events, event => event.start))
  const allTimeSlots = groupedTimes.map(item => {
    return {timeslot: moment(item).format('HH:mm'), time: item, day: getDateOnly(item)}
  })
    .sort((a, b) => { return (a.timeslot < b.timeslot ? -1 : 1) })
  return groupBy(allTimeSlots, slot => slot.day)
}

function getEvents () {
  axios.get(base + 'rest/conferences/' + getConferenceId())
    .then(function (response) {
      response.data.events.forEach(v => {
        enrichEventData(v)
      })
      const timeslots = calculateTimeslots(response.data.events)
      const splitEvents = splitLongEvents(response.data.events, timeslots)
      splitEvents.forEach(v => {
        Vue.set(events, v.htmlId, v)
      })
      response.data.speakers.forEach(v => {
        Vue.set(speakers, v.id, Object.freeze(v))
      })
      response.data.metaData.locations.forEach(v => {
        Vue.set(locations, v.id, Object.freeze(v))
      })
      response.data.metaData.languages.forEach(v => {
        Vue.set(languages, v.id, Object.freeze(v))
      })
      response.data.metaData.audiences.forEach(v => {
        Vue.set(audiences, v.id, Object.freeze(v))
      })
      response.data.metaData.tracks.forEach(v => {
        Vue.set(tracks, v.id, Object.freeze(v))
      })
      const days = groupBy(events, function (event) { return event.startOfSlice ? event.startOfSlice.substr(0, 10) : null })
      Object.entries(days).forEach(e => {
        Vue.set(eventsByDay, e[0], e[1])
      })
      Favorites.updateEventsWithLocalFavorites()
      if (!favoritesUpdateIntervalHandle) {
        favoritesUpdateIntervalHandle = window.setInterval(getFavoritesAndBookingsUpdates, refreshIntervalFavoritesMs)
      }
      if (!eventUpdateIntervalHandle) {
        window.setTimeout(getEvents, refreshToBustCache)
        eventUpdateIntervalHandle = window.setInterval(getEvents, refreshIntervalEventsMs)
      }
      getFavoritesAndBookingsUpdates()
      conference.loadingFinished = true
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
    name: null,
    loadingFinished: false,
    loadingFailed: false
  }
}

// ability to reset is needed for testing this component
reset()

// test if we are running in local served mode to test offline mode
if (window.location.href.indexOf('http://localhost:5000') !== -1) {
  base = 'https://latest.dukecon.org/javaland/2019/'
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
      getEvents()
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
      conference.loadingFailed = true
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

  static getBaseUrl () {
    init()
    return base + 'rest/conferences/'
  }

  // use this for testing
  static _reset () {
    reset()
  }
}
