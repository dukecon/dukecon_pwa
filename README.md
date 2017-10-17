# dukecon_pwa

This implements a conference planner for different Conferences, for example [JavaLand](http://javaland.eu).

The current development status can be found here: [JavaLand 2018](https://latest.dukecon.org/pwa/javaland/2018/)

## Build Status

* [![Build Status](https://travis-ci.org/dukecon/dukecon_pwa.svg?branch=develop)](https://travis-ci.org/dukecon/dukecon_pwa)

## Developer Docs

You find more information in the [developer docs](doc/README.adoc)

Use the following NPM commands to start developing. 

``` bash
# install dependencies
npm install

# update dependencies
npm update

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

## TODOs 

* Timetable

### Functionality

* conference CSS dynamically
* redirect old links with parsing ID i.e. with talks.html
* show error message if speaker ID or event ID given in URL doesn't exist

### Future

* Separate route for each day in the overview: this will allow back-navigation when switching days and direct routing to a specific day
* hide days without events while searching/filtering
* define order of talks in TalksGrid: this will give stable sorting independent of order in the backend

### Out-of-scope

* Cookie warning - no longer used by DOAG
* link to account management when logged in - not used by any conference
