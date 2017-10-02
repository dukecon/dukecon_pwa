<template>
  <a class="mainmenu darkBack reverse" id="language-select" v-on:click='change'>
    <img class="language" alt="Sprache umschalten / Change language" title="Sprache umschalten / Change language" :src="img" />
  </a>
</template>

<script language="">
  export default {
    name: 'language',
    methods: {
      change: function (event) {
        if (this.$i18n.locale === 'de') {
          this.$i18n.locale = 'en'
        } else {
          this.$i18n.locale = 'de'
        }
      }
    },
    computed: {
      img: function () {
        return require('@/assets/img/' + this.$i18n.locale + '.png')
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
