<template>
  <div id="alert-window" class="dark" v-if="visible">
    <div class="alert-title darkBack reverse">{{ $t('favoriteAlertTitle') }}</div>
    <div class="alert-body" v-html="$t('favoriteAlertBody')"></div>
    <div class="alert-button">
      <button @click="clicked">OK</button>
    </div>
  </div>
</template>

<script>
  import Favourites from '../Favourites'
  import Conference from '../Conference'
  import Dukecloak from '../DukeconKeycloak'

  function createCookie (name, value, days) {
    let expires
    if (days) {
      const date = new Date()
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
      expires = '; expires=' + date.toGMTString()
    } else {
      expires = ''
    }
    document.cookie = name + '=' + value + expires + '; path=' + window.location.pathname
  }

  function readCookie (name) {
    var nameEQ = name + '='
    var ca = document.cookie.split(';')
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i]
      while (c.charAt(0) === ' ') c = c.substring(1, c.length)
      if (c.indexOf(nameEQ) === 0) {
        return c.substring(nameEQ.length, c.length)
      }
    }
    return null
  }

  export default {
    name: 'pleaseLogin',
    data () {
      return {
        visible: false,
        conference: Conference.getConference(),
        favourites: Favourites.getFavorites()
      }
    },
    watch: {
      // when the favourites change and the use is not logged it, we will show a popup
      favourites: function () {
        if (readCookie('dukecon.favouriteAlertSeen') !== '1' &&
          this.conference.authEnabled === true &&
          !Dukecloak.getKeycloak().isLoggedIn) {
          this.visible = true
        }
      }
    },
    methods: {
      clicked: function () {
        createCookie('dukecon.favouriteAlertSeen', '1', 1)
        this.visible = false
      }
    }
  }
</script>
