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
    'noOtherTalks': '-- keine --',
    'feedback': 'Feedback',
    'feedback_content': '<span>Rückmeldungen zur Conference Planner Webseite bitte per Mail an</span> <a href="mailto:feedback@dukecon.org" title="email">feedback@dukecon.org</a> <span>oder direkt</span><a href="https://github.com/dukecon/dukecon/issues" title="Isssuetracker">hier</a> <span>ein Ticket erfassen!</span>',
    'backbutton': 'Zurück',
    'saveAsFavourite': 'Als Favorit speichern',
    'removeFavourite': 'Favorit gespeichert',
    'filterOptions': 'Filter-Optionen',
    'reset': 'Zurücksetzen',
    'active': 'Aktiv',
    'toggleFavorites': 'Nur Favoriten',
    'language': 'Sprache',
    'level': 'Zielgruppe',
    'track': 'Stream',
    'location': 'Ort'
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
    'noOtherTalks': '-- none --',
    'feedback': 'Feedback',
    'feedback_content': '<span>Please send any feedback about the Conference Planner website via mail to</span> <a href="mailto:feedback@dukecon.org">feedback@dukecon.org</a> <span>or</span> <a href="https://github.com/dukecon/dukecon/issues" title="Isssuetracker">create a ticket here</a> <span>!</span>',
    'backbutton': 'Back',
    'saveAsFavourite': 'Save as favorite',
    'removeFavourite': 'Favourite saved',
    'filterOptions': 'Filter Options',
    'reset': 'Reset',
    'active': 'Active',
    'toggleFavorites': 'Only Favorites',
    'language': 'Language',
    'level': 'Audience',
    'track': 'Stream',
    'location': 'Location'
  }
}

// Create VueI18n instance with options
export let i18n = new VueI18n({
  locale: 'de', // default locale
  messages
})
