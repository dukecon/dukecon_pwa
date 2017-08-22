import Keycloak from 'keycloak-js'

/* This provides the Keycloak instance plus some enhancements regarding login status.
 * The Keycloak instance is a singleton that will be used throughout the application. */

var keycloak = Keycloak('rest/keycloak.json')

// add properties so that Vue known about them from the start
keycloak.isLoggedIn = false
keycloak.name = null
keycloak.userName = null

keycloak.onAuthSuccess = function () {
  keycloak.isLoggedIn = true
  keycloak.loadUserInfo().success(function (info) {
    keycloak.name = info.name
    keycloak.userName = info.preferred_username
  }).error(function (result) {
    console.log('Unable to load user profile')
    console.log('result.status: ' + (result && result.status))
    console.log('result.text: ' + (result && result.text))
  })
}

keycloak.onAuthLogout = function () {
  keycloak.isLoggedIn = false
}

export default class DukeconKeycloak {
  static getKeycloak () {
    return keycloak
  }
}

