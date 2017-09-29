<template>
  <router-link to="/" id="logo"><img alt="Zurück zu " title="Zurück zu " :src="imgdata"/></router-link>
</template>

<script language="">
  import Images from '../../Images'

  export default {
    name: 'homeicon',
    data () {
      return {
        images: null,
        conference: null
      }
    },
    created () {
      this.images = Images.getImages()
    },
    computed: {
      imgdata: function () {
        return this.images.conferenceImage
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped="true">
</style>
