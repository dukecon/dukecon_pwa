import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const messages = Object.freeze({
  de: {
    termsOfUse: 'Nutzungsbedingungen',
    imprint: 'Impressum',
    privacy: 'Datenschutz',
    simultan: 'mit Simultanübersetzung',
    speaker: 'Sprecher',
    'speaker.notFound': 'Sprecher nicht gefunden',
    'talk.notFound': 'Talk nicht gefunden',
    'talk.longduration': 'Dauert länger',
    fullyBooked: 'voll besetzt',
    speakertalks: 'Talks dieses Sprechers',
    other_speakertalks: 'Weitere Talks dieses Sprechers',
    noOtherTalks: '-- keine --',
    feedback: 'Feedback',
    feedback_content: '<span>Rückmeldungen zur Conference Planner Webseite bitte per Mail an</span> <a href="mailto:feedback@dukecon.org" title="email">feedback@dukecon.org</a> <span>oder direkt</span><a href="https://github.com/dukecon/dukecon/issues" title="Isssuetracker">hier</a> <span>ein Ticket erfassen!</span>',
    backbutton: 'Zurück',
    saveAsFavourite: 'Als Favorit speichern',
    removeFavourite: 'Favorit gespeichert',
    filterOptions: 'Filter-Optionen',
    reset: 'Zurücksetzen',
    active: 'Filter Aktiviert',
    toggleFavorites: 'Nur Favoriten',
    language: 'Sprache',
    level: 'Zielgruppe',
    track: 'Stream',
    location: 'Ort',
    uparrow: 'nach oben',
    notalksfound: 'Keine Talks gefunden; bitte die Filter ',
    emptyConference: 'Talks für diese Konferenz stehen noch nicht fest.',
    notExistingConference: 'Diese Konferenz existiert (noch) nicht.',
    deactivate: 'Deaktivieren',
    or: ' oder ',
    disablefavorites: 'Ist eventuell die Einstellung "Nur Favoriten" aktiviert?',
    loggedIn: 'eingeloggt',
    doLogin: 'einloggen',
    doLogout: 'abmelden',
    search: 'Suchen',
    timetable: 'Stundenplan',
    favoriteAlertTitle: 'Favoriten',
    favoriteAlertBody: 'Favoriten zu setzen verbessert unsere Raumplanung.<br>Allerdings werden diese erst auf den Server und Eure anderen Geräte synchronisiert, wenn Ihr Euch einloggt bzw. registriert. <br><br>Klickt dazu bitte auf das Schloss-Symbol oben.',
    loginAlertTitle: 'Anmeldung',
    loginAlertBody: 'Eine Anmeldung ist nur möglich, wenn du online bist. Du scheinst gerade offline zu sein. Bitte prüfe deine Netzwerverbindung und probiere es noch einmal.',
    'document.slides': 'Präsentation',
    'document.manuscript': 'Manuskript',
    'document.other': 'Andere',
    documentDownload: 'Unterlagen zum Herunterladen',
    'document.noDocuments': 'Derzeit keine Unterlagen zum Download verfügbar.',
    'feedback.popupbutton': 'Feedback geben',
    'feedback.header': 'Wie hat dir dieser Talk gefallen?',
    'feedback.rating.good': 'Gut',
    'feedback.rating.okay': 'Okay',
    'feedback.rating.bad': 'Schlecht',
    'feedback.text': 'Bitte erkläre deine Wahl',
    'feedback.submit': 'Abschicken',
    'feedback.cancel': 'Abbrechen',
    'feedback.loginMessage': 'Bitte log dich ein, um Feedback zu geben.',
    'menu.open': 'Menü öffnen',
    'menu.close': 'Menü schließen',
    'filter.open': 'Filter-Menü öffnen',
    'filter.close': 'Filter-Menü schließen',
    'filter.hide': 'Bereich verbergen',
    'filter.show': 'Bereich anzeigen'
  },
  en: {
    termsOfUse: 'Terms of use',
    imprint: 'Legal mentions',
    privacy: 'Privacy',
    simultan: 'with live translation',
    speaker: 'Speakers',
    'speaker.notFound': 'Speaker not found',
    'talk.notFound': 'Talk not found',
    'talk.longduration': 'Long event',
    fullyBooked: 'fully booked',
    speakertalks: 'Talks held by this speaker',
    other_speakertalks: 'Other talks held by this speaker',
    noOtherTalks: '-- none --',
    feedback: 'Feedback',
    feedback_content: '<span>Please send any feedback about the Conference Planner website via mail to</span> <a href="mailto:feedback@dukecon.org">feedback@dukecon.org</a> <span>or</span> <a href="https://github.com/dukecon/dukecon/issues" title="Isssuetracker">create a ticket here</a> <span>!</span>',
    backbutton: 'Back',
    saveAsFavourite: 'Save as favourite',
    removeFavourite: 'Favourite saved',
    filterOptions: 'Filter Options',
    reset: 'Reset',
    active: 'Filters Enabled',
    toggleFavorites: 'Only Favourites',
    language: 'Language',
    level: 'Audience',
    track: 'Stream',
    location: 'Location',
    uparrow: 'back to top',
    notalksfound: 'No talks found; please perform a filter ',
    emptyConference: 'No talks scheduled for this conference yet.',
    notExistingConference: 'This conference does not exist (yet).',
    deactivate: 'Deactivation',
    or: ' or ',
    disablefavorites: 'Also check if you have "Only Favourites" selected.',
    loggedIn: 'logged in',
    doLogin: 'log in',
    doLogout: 'log out',
    search: 'Search',
    timetable: 'Timetable',
    favoriteAlertTitle: 'Favourites',
    favoriteAlertBody: 'Favourites are used for room capacity planning.<br>They are only synchronized with the server and your other devices once you log in. <br><br>Click the lock symbol at the top to do so, please.',
    loginAlertTitle: 'Login',
    loginAlertBody: 'Logging in is only possible while you are online. You currently seem to be offline. Please check your network connection and try again.',
    'document.slides': 'Presentation',
    'document.manuscript': 'Manuscript',
    'document.other': 'Other',
    documentDownload: 'Documents to download',
    'document.noDocuments': 'No documents available at this time.',
    'feedback.popupbutton': 'Give feedback',
    'feedback.header': 'How did you like this talk?',
    'feedback.rating.good': 'Good',
    'feedback.rating.okay': 'Okay',
    'feedback.rating.bad': 'Bad',
    'feedback.text': 'Please explain your choice',
    'feedback.submit': 'Submit feedback',
    'feedback.cancel': 'Cancel',
    'feedback.loginMessage': 'Log in to leave feedback',
    'menu.open': 'Open menu',
    'menu.close': 'Close menu',
    'filter.open': 'Open Filter-Menu',
    'filter.close': 'Close Filter-Menü',
    'filter.hide': 'Hide section',
    'filter.show': 'Show section'
  }
})

// Create VueI18n instance with options
export const i18n = new VueI18n({
  locale: 'de', // default locale
  messages
})
