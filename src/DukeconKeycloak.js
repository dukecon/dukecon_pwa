import Keycloak from 'keycloak-js'
import Settings from './Settings'
import axios from 'axios/index'

var base = ''

if (window.location.href.indexOf('http://localhost:8080') !== -1) {
  base = 'https://latest.dukecon.org/javaland/2019/'
}

/* This provides the Keycloak instance plus some enhancements regarding login status.
 * The Keycloak instance is a singleton that will be used throughout the application. */

var keycloak = Keycloak(base + 'rest/keycloak.json')

// add properties so that Vue known about them from the start
keycloak.isLoggedIn = false
keycloak.name = null
keycloak.userName = null

function saveTokens () {
  Settings.saveSetting('keycloak_token', keycloak.token)
  Settings.saveSetting('keycloak_refreshToken', keycloak.refreshToken)
  Settings.saveSetting('keycloak_idToken', keycloak.idToken)
  Settings.saveSetting('keycloak_timeSkew', keycloak.timeSkew)
}

function clearTokens () {
  Settings.clearSetting('keycloak_token')
  Settings.clearSetting('keycloak_refreshToken')
  Settings.clearSetting('keycloak_idToken')
  Settings.clearSetting('keycloak_timeSkew')
}

keycloak.onAuthRefreshSuccess = function () {
  saveTokens()
}

keycloak.onAuthSuccess = function () {
  saveTokens()
  keycloak.isLoggedIn = true
  keycloak.updateToken(30).success(() => {
    keycloak.loadUserInfo().success(function (info) {
      keycloak.name = info.name
      keycloak.userName = info.preferred_username
    }).error(function (result) {
      console.log('Unable to load user profile')
      console.log('result.status: ' + (result && result.status))
      console.log('result.text: ' + (result && result.text))
    })
  }).error(() => {
    console.log('unable to refresh token to load user info')
  })
}

export default class DukeconKeycloak {
  static init () {
    keycloak.timeSkew = Settings.getSetting('keycloak_timeSkew')
    const initResult = keycloak.init({
      // when using checkLoginIframe, the check-sso option doesn't require a redirect on initialization
      // but checkLoginIframe doesn't work with offline tokens, as there is no current session with Keycloak
      // onLoad: 'check-sso',
      scope: 'offline_access',
      checkLoginIframe: false,
      token: Settings.getSetting('keycloak_token'),
      idToken: Settings.getSetting('keycloak_idToken'),
      refreshToken: Settings.getSetting('keycloak_refreshToken')
    })
    if (Settings.getSetting('keycloak_refreshToken') !== undefined) {
      keycloak.isLoggedIn = true
    }
    return initResult
  }

  static getKeycloak () {
    return keycloak
  }

  static login () {
    keycloak.login({scope: 'offline_access'})
  }

  static logout () {
    clearTokens()
    keycloak.isLoggedIn = false
    keycloak.logout()
  }

  // call this method if you suspect a problem with the keycloak tokens.
  // this method checks the network connection. If that works, network problems are ruled out
  // and we forget about the current tokens
  static handleErrorOnLogin () {
    if (keycloak.isLoggedIn) {
      axios.get(keycloak.authServerUrl + '/realms/' + keycloak.realm + '/.well-known/openid-configuration')
        .then(function (response) {
          // network connection is OK, therefore we should log out
          // as we assume something is wrong/expired with the tokens we have
          clearTokens()
          keycloak.isLoggedIn = false
          keycloak.logout()
        })
    }
  }
}
