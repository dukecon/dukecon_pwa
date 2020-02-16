<template>
  <div id="login-area" class="darkBack" v-if="conference.authEnabled">
    <a class="button" :title="keycloak.isLoggedIn ? $t('doLogout') : $t('doLogin')" href="#" @click.prevent="loginOrOut">
      <svg v-if='!keycloak.isLoggedIn' height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0h24v24H0z" fill="none"/>
        <path class="line" d="M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6h1.9c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm0 12H6V10h12v10z"/>
      </svg>
      <svg v-if='keycloak.isLoggedIn' height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <path d="M0 0h24v24H0V0z" id="a" fill="none"/>
        <path class="line" d="M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM8.9 6c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1v2H8.9V6zM18 20H6V10h12v10z"/>
      </svg>
    </a>
    <span class="username" v-if='keycloak.isLoggedIn'
          :title="keycloak.name + ' (' + keycloak.userName + ')'">{{$t('loggedIn')}}<br/></span>
    <div class="alert-window dark" v-if="alertVisible">
      <div class="alert-title darkBack reverse">{{ $t('loginAlertTitle') }}</div>
      <div class="alert-body" v-html="$t('loginAlertBody')"></div>
      <div class="alert-button">
        <button @click="alertClicked">OK</button>
      </div>
    </div>
  </div>
</template>

<script language="">
import DukeconKeycloak from '../../DukeconKeycloak'
import Conference from '../../Conference'

export default {
  name: 'login',
  data () {
    return {
      keycloak: DukeconKeycloak.getKeycloak(),
      conference: Conference.getConference(),
      alertVisible: false
    }
  },
  methods: {
    loginOrOut: function () {
      if (this.keycloak.isLoggedIn) {
        this.logout()
      } else {
        this.login()
      }
    },
    login: function () {
      if (navigator && navigator.onLine === false) {
        this.alertVisible = true
      } else {
        DukeconKeycloak.login()
      }
    },
    logout: function () {
      DukeconKeycloak.logout()
    },
    alertClicked: function () {
      this.alertVisible = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
