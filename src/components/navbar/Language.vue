<template>
  <a class="mainmenu darkBack" id="language-select" v-on:click='change'>
    <img class="language" alt="Sprache umschalten / Change language" title="Sprache umschalten / Change language"
         :src="img"/>
  </a>
</template>

<script language="">
  import Settings from '../../Settings'

  const selectedLanguageKey = 'dukecon_language'

  export default {
    name: 'language',
    methods: {
      change: function (event) {
        if (this.$i18n.locale === 'de') {
          this.$i18n.locale = 'en'
        } else {
          this.$i18n.locale = 'de'
        }
        Settings.saveSetting(selectedLanguageKey, this.$i18n.locale)
      }
    },
    computed: {
      img: function () {
        return require('@/assets/img/' + this.$i18n.locale + '.png')
      }
    },
    created: function () {
      this.$i18n.locale = Settings.getSetting(selectedLanguageKey, this.$i18n.locale)
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
