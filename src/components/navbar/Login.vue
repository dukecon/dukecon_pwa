<template>
  <div id="login-area" v-if="">
    <a class="button">
      <img alt="Sign in/Register" v-on:click='login' v-if='!keycloak.isLoggedIn' src="../../assets/img/unlock_24px.svg">
      <img alt="Sign out" v-on:click='logout' v-if='keycloak.isLoggedIn' src="../../assets/img/lock_24px.svg">
    </a>
    <span class="username" v-if='keycloak.isLoggedIn'
          :title="keycloak.name + ' (' + keycloak.userName + ')'">{{$t('loggedIn')}}<br/></span>
    <!-- TODO: the old dukecon app contained a link to the account management, but no conference seems to use this? -->
  </div>
</template>

<script language="">
  import DukeconKeycloak from '../../DukeconKeycloak'

  export default {
    name: 'login',
    data () {
      return {
        keycloak: DukeconKeycloak.getKeycloak()
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
