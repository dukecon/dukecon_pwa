<template>
  <div id="login-area" v-if="conference.authEnabled">
    <a class="button">
      <img alt="Sign in/Register" v-on:click='login' v-if='!keycloak.isLoggedIn' src="../../assets/img/unlock_24px.svg">
      <img alt="Sign out" v-on:click='logout' v-if='keycloak.isLoggedIn' src="../../assets/img/lock_24px.svg">
    </a>
    <span class="username" v-if='keycloak.isLoggedIn'
          :title="keycloak.name + ' (' + keycloak.userName + ')'">{{$t('loggedIn')}}<br/></span>
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
        conference: Conference.getConference()
      }
    },
    methods: {
      login: function () {
        DukeconKeycloak.login()
      },
      logout: function () {
        DukeconKeycloak.logout()
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
