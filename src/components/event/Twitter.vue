<template>
  <span class="twitter" v-if="url && url !== 'http://'">
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
      if (twitterString.startsWith('http')) {
        let urlRegex = new RegExp('.*/(.+)')
        tUrl = twitterString
        tHandle = '@' + twitterString.replace(urlRegex, '$1')
      } else if (twitterString.startsWith('twitter.com/')) {
        let urlRegex = new RegExp('.*/(.+)')
        tUrl = 'https://' + twitterString
        tHandle = '@' + twitterString.replace(urlRegex, '$1')
      } else {
        if (twitterString.charAt(0) !== '@') {
          twitterString = '@' + twitterString
        }
        tHandle = twitterString
        tUrl = 'https://twitter.com/' + (twitterString.indexOf('@') === 0 ? twitterString.substr(1) : twitterString)
      }
      if (tHandle.endsWith('/')) {
        tHandle = tHandle.replace(/\/$/, '')
      }
      if (tHandle.indexOf('?') !== 0) {
        tHandle = tHandle.replace(/\?.*/, '')
      }
    }

    return {
      twitterUrl: tUrl,
      twitterHandle: tHandle
    }
  }
}
</script>
