<template>
  <a target="_blank" class="mainmenu darkBack" :href="conference.homeUrl">{{ conference.homeTitle }}</a>
</template>

<script language="">
  import Conference from '../../Conference'

  export default {
    name: 'conference',
    data () {
      return {
        conference: Conference.getConference()
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
