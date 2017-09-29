<template>
  <span class="twitter" v-if="url">
    <a target="_blank" :href="twitterUrl">{{ twitterHandle }}</a>
  </span>
</template>

<script>
  export default {
    name: 'twitter',
    props: ['url'],
    data () {
      var tUrl = null
      var tHandle = null
      var twitterString = this.url
      if (twitterString && this.url.length > 1) {
        if (twitterString.indexOf('http') === 0) {
          var urlRegex = new RegExp('.*/(.+)')
          tUrl = twitterString
          tHandle = '@' + twitterString.replace(urlRegex, '$1')
        } else {
          tHandle = twitterString
          tUrl = 'https://www.twitter.com/' + (twitterString.indexOf('@') === 0 ? twitterString.substr(1) : twitterString)
        }
      }

      return {
        twitterUrl: tUrl,
        twitterHandle: tHandle
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
