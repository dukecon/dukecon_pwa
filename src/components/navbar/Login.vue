<template>
  <div id="login-area">
    <span v-if='keycloak.isLoggedIn'>logged in as: {{ keycloak.name }} ({{ keycloak.userName }})<br /></span>
    <a class="button">
      <img alt="Sign in/Register" v-on:click='login' v-if='!keycloak.isLoggedIn' src="../../assets/img/unlock_24px.svg">
      <img alt="Sign out" v-on:click='logout' v-if='keycloak.isLoggedIn' src="../../assets/img/lock_24px.svg">
    </a>
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
        this.keycloak.login()
      },
      logout: function () {
        this.keycloak.logout()
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
