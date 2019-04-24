<template>
  <a class="mainmenu darkBack" id="language-select" v-on:click='change' v-if="languageSwitchVisible">
    <img class="language" alt="Sprache umschalten / Change language" title="Sprache umschalten / Change language"
         :src="img"/>
  </a>
</template>

<script language="">
import Settings from '../../Settings'
import Conference from '../../Conference'

const selectedLanguageKey = 'dukecon_language'

export default {
  name: 'language',
  data () {
    return {
      languages: Conference.getAllLanguages()
    }
  },
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
    },
    languageSwitchVisible: function () {
      if (Object.keys(this.languages).length <= 1) {
        return false
      }
      return true
    }
  },
  watch: {
    languages: function () {
      if (Object.keys(this.languages).length === 1) {
        // if there is a one language only for all talks, use it as the user's language as well
        this.$i18n.locale = this.languages[Object.keys(this.languages)[0]].code
        Settings.saveSetting(selectedLanguageKey, this.$i18n.locale)
      }
    }
  },
  created: function () {
    this.$i18n.locale = Settings.getSetting(selectedLanguageKey, this.$i18n.locale)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped language="less">

</style>
