import Settings from './Settings'
import Vue from 'vue'
import Dukecloak from './DukeconKeycloak'
import axios from 'axios'
import Conference from './Conference'

const favoritesKey = 'dukeconfavs'

// current state for view-binding
const favorites = {}

// queue for additions and removals
const favoritesToAdd = new Set()
const favoritesToRemove = new Set()

Settings.getSetting(favoritesKey, []).forEach(e => Vue.set(favorites, e, true))
Settings.getSetting(favoritesKey + 'Add', []).forEach(e => favoritesToAdd.add(e))
Settings.getSetting(favoritesKey + 'Remove', []).forEach(e => favoritesToRemove.add(e))

let loadedFromServer = false

/* initially sync with server just once per start of the app */
function initialLoadFromServer () {
  if (!Dukecloak.getKeycloak().isLoggedIn) {
    return
  }
  if (loadedFromServer) {
    return
  }
  loadedFromServer = true
  syncWithServer()
}

/* The idea of syncing as implemented here:
  1. get current state from the server
  2. from the server's state remove and add the pending removals and additions (and set this as new client state)
  3. save to server
  4. from the pending removals and additions tick off the ones we memorized in step 2
  Benefits
    * if the client looses connectivity with the server, all additions and removals are queued
    * if a user uses several clients, additions and removals will become visible eventually
    * when the user marks different talks on the different clients, the changes will be merged without conflicts
    * adding the same talk or removing the same talk on different clients will not lead to conflicts
    * it is save to change favorites in the client while this is running
  Obscure
    * when you log off, your additions and removals will be queued. The additions and removals will be merged with the next account you log in with.
      assuming this will be the user you logged in previously, this will lead to the expected results
  Limitations:
    * this will work as long as the server state is not changed between 1 (get server state) and 3 (save server state)
    * if clients have synced at times where they received a different state of the favorite, changing it on multiple clients leads to indeterministic results
 */
let syncIsRunning = false

function syncWithServer () {
  if (Dukecloak.getKeycloak().isLoggedIn) {
    if (syncIsRunning) {
      // avoid having two syncs running at the same time
      return
    }
    syncIsRunning = true
    Dukecloak.getKeycloak().updateToken()
      .success(function () {
        var config = {
          headers: {'Authorization': 'bearer ' + Dukecloak.getKeycloak().token}
        }
        axios.get('rest/preferences',
          config)
          .then((response) => {
            // clear favorites if there is a state on the server (not for initial logins)
            if (response.data.length > 0) {
              Object.keys(favorites).filter(e => e !== undefined)
                .forEach(e => Vue.delete(favorites, e))
            }
            // add all favorites from server to favorites
            response.data.filter(e => e !== 'undefined').forEach(e => Vue.set(favorites, e.eventId, true))
            // remove again all favorites that are pending removal
            favoritesToRemove.forEach(e => Vue.delete(favorites, e))
            // add again all favorites that are pending addition
            favoritesToAdd.forEach(e => Vue.set(favorites, e, true))
            // => now the favorites contain the state from the server merged with pending additions and removals
            console.log('favorites loaded from server')
            saveToSettings()
            if (favoritesToRemove.size > 0 || favoritesToAdd.size > 0) {
              // there are pending changes.
              // let's memorize the additions and removals now before making the next request
              let favoritesToAddInThisRequest = Array.from(favoritesToAdd.keys())
              let favoritesToRemoveInThisRequest = Array.from(favoritesToRemove.keys())
              let newServerState = Object.keys(favorites)
                .filter(e => e !== undefined && e !== 'undefined')
                .map(e => { return {'eventId': e, 'version': '1'} })
              axios.post('rest/preferences',
                newServerState,
                config)
                .then(() => {
                  favoritesToAddInThisRequest.forEach(e => { favoritesToAdd.delete(e) })
                  favoritesToRemoveInThisRequest.forEach(e => { favoritesToRemove.delete(e) })
                  syncIsRunning = false
                  console.log('favorites saved to server')
                  saveToSettings()
                })
                .catch((e) => {
                  syncIsRunning = false
                  console.log('unable to save favorites', e)
                })
            } else {
              syncIsRunning = false
            }
          })
          .catch((e) => {
            syncIsRunning = false
            console.log('unable to load favorites', e)
          })
      })
      .error(function () {
        syncIsRunning = false
        console.log('Error!')
      })
  }
}

function saveToSettings () {
  Settings.saveSetting(favoritesKey,
    // Vue.delete sets keys to undefined. this statements filters these
    Object.keys(favorites).filter(e => e !== undefined)
  )
  Settings.saveSetting(favoritesKey + 'Add',
    Array.from(favoritesToAdd.keys())
  )
  Settings.saveSetting(favoritesKey + 'Remove',
    Array.from(favoritesToRemove.keys())
  )
}

let pleaseLoginCallback

export default class Favorites {
  static toggleFavorite (eventId) {
    let events = Conference.getAllEvents()
    if (favorites[eventId] === true) {
      if (events[eventId].numberOfFavorites > 0) {
        // Paranoia: don't allow numberOfFavorites to be negative
        events[eventId].numberOfFavorites--
      }
      Vue.delete(favorites, eventId)
      // remove it from the add queue, or add it to the remove queue
      if (favoritesToAdd.has(eventId)) {
        favoritesToAdd.delete(eventId)
      } else {
        favoritesToRemove.add(eventId)
      }
    } else {
      if (!Dukecloak.getKeycloak().isLoggedIn) {
        if (pleaseLoginCallback) {
          pleaseLoginCallback()
        }
      }
      events[eventId].numberOfFavorites++
      Vue.set(favorites, eventId, true)
      // remove it from the remove queue, or add it to the add queue
      if (favoritesToRemove.has(eventId)) {
        favoritesToRemove.delete(eventId)
      } else {
        favoritesToAdd.add(eventId)
      }
    }
    saveToSettings()
    syncWithServer()
  }

  /**
   * This will update the Favorites as loaded from the server with the favorites that are currently
   * waiting to be saved on the server.
   */
  static updateEventsWithLocalFavorites () {
    let events = Conference.getAllEvents()
    favoritesToAdd.forEach(e => events[e].numberOfFavorites++)
    favoritesToRemove.forEach(e => {
      if (events[e].numberOfFavorites > 0) {
        // Paranoia: don't allow numberOfFavorites to be negative
        events[e].numberOfFavorites--
      }
    })
  }

  static registerPleaseLoginCallback (e) {
    pleaseLoginCallback = e
  }

  static getFavorites () {
    initialLoadFromServer()
    return favorites
  }

}
