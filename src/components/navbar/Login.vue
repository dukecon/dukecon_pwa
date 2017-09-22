<template>
  <span class="login">
    <span v-if='keycloak.isLoggedIn'>logged in as: {{ keycloak.name }} ({{ keycloak.userName }})<br /></span>
    <span style="cursor: pointer">
      <span v-on:click='login' v-if='!keycloak.isLoggedIn'>(login)</span>
      <span v-on:click='logout' v-if='keycloak.isLoggedIn'>(logout)</span>
    </span>
  </span>
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
