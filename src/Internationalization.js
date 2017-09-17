import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const messages = {
  de: {
    'termsOfUse': 'Nutzungsbedingungen',
    'imprint': 'Impressum',
    'privacy': 'Datenschutz'
  },
  en: {
    'termsOfUse': 'Terms of use',
    'imprint': 'Legal mentions',
    'privacy': 'Privacy'
  }
}

// Create VueI18n instance with options
export let i18n = new VueI18n({
  locale: 'de', // default locale
  messages
})
