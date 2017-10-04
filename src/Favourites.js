import Settings from './Settings'
import Vue from 'vue'

const favoritesKey = 'dukeconfavs'

const favorites = {}

Settings.getSetting(favoritesKey, []).forEach(e => Vue.set(favorites, e, true))

export default class Favorites {
  static toggleFavorite (eventId) {
    if (favorites[eventId] === true) {
      Vue.delete(favorites, eventId)
    } else {
      Vue.set(favorites, eventId, true)
    }
    Settings.saveSetting(favoritesKey,
      // Vue.delete sets keys to undefined. this statements filters these
      Object.keys(favorites).filter(e => e !== undefined)
    )
  }

  static getFavorites () {
    return favorites
  }

}
