# dukecon_pwa

This implements a conference planner for different Conferences, for example [JavaLand](http://javaland.eu).

The current development status can be found here: [JavaLand 2018](https://latest.dukecon.org/pwa/javaland/2018/)

## Build and Dependency Status

* [![Build Status](https://travis-ci.org/dukecon/dukecon_pwa.svg?branch=develop)](https://travis-ci.org/dukecon/dukecon_pwa)

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run unit tests in a loop
npm run unitloop

# run e2e tests
npm run e2e

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## TODOs Vue.js Komponenten

* Cookie Meldung
* Stundenplan

### Header

* Suchen

## Funktionalität

* Login komplett umsetzen (inkl. Anzeigen der Nuzterdaten und Speichern der Anmeldung als Offline Token)
* Favoriten aus dem Backend laden / im Backend speichern
* Fav-Icon dynamisch setzen
* Konferenz-CSS dynamisch setzen

## Future

* Separate Route für jeden einzelnen Tag in der Übersicht
* Reihenfolge der Vorträge in der TalksGrid definieren
