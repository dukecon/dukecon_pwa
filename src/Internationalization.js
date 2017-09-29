import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const messages = {
  de: {
    'termsOfUse': 'Nutzungsbedingungen',
    'imprint': 'Impressum',
    'privacy': 'Datenschutz',
    'simultan': 'mit Simultanübersetzung',
    'speaker': 'Sprecher',
    'fullyBooked': 'voll besetzt',
    'speakertalks': 'Talks dieses Sprechers',
    'other_speakertalks': 'Weitere Talks dieses Sprechers',
    'noOtherTalks': '-- keine --'
  },
  en: {
    'termsOfUse': 'Terms of use',
    'imprint': 'Legal mentions',
    'privacy': 'Privacy',
    'simultan': 'with live translation',
    'speaker': 'Speakers',
    'fullyBooked': 'fully booked',
    'speakertalks': 'Talks held by this speaker',
    'other_speakertalks': 'Other talks held by this speaker',
    'noOtherTalks': '-- none --'
  }
}

// Create VueI18n instance with options
export let i18n = new VueI18n({
  locale: 'de', // default locale
  messages
})
