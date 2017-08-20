<template>
  <div class="talk">
    <h1>Talk</h1>
    <p>{{ $route.params.talkId }}</p>
    <p>Abstract {{fullMessage}}</p>
    <p>Speaker</p>
  </div>
</template>

<script>
export default {
  name: 'talk',
  data () {
    return {
      msg: 'Welcome to Your Vue.js PWA' + this.$route.params.talkId
    }
  },
  computed: {
    fullMessage: function () {
      return 'Welcome to Your Vue.js PWA' + this.$route.params.talkId
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
