import moxios from 'moxios'
import Conference from '../../../src/Conference'
import { size } from 'lodash'
import minimalConferenceData from './minimalConferenceData.js'

describe('Conference.js', () => {
  beforeEach(function () {
    Conference._reset()
    moxios.install()
  })

  afterEach(function () {
    moxios.uninstall()
  })

  it('should load conference data asynchronously', done => {
    // given ....
    // ... an empty conference
    const conference = Conference.getConference()
    expect(conference.imprint['de']).to.be.an('undefined')
    // when ...
    // ... initialized
    moxios.wait(function () {
      let request = moxios.requests.mostRecent()
      expect(request.url).to.equal('rest/init.json')
      request.respondWith({
        status: 200,
        // TODO: move to minimalConferenceData.js
        responseText: '{"id":"javaland2017","name":"JavaLand 2017","year":"2017","url":"http://javaland.dukecon.org/2017","homeUrl":"http://www.javaland.eu","homeTitle":null,"imprint":{"de":"https://www.javaland.eu/de/impressum/","en":"https://www.javaland.eu/en/imprint/"},"termsOfUse":{"de":"https://www.javaland.eu/de/nutzungsbedingungen/","en":"https://www.javaland.eu/en/term-of-use/"},"privacy":{"de":"https://www.javaland.eu/de/datenschutz/","en":"https://www.javaland.eu/en/privacy/"},"startDate":"2017-03-28","endDate":"2017-03-30","authEnabled":true}'
      }).then(function () {
        // then ...
        // ... conference data is filled
        expect(conference.imprint['de']).to.equal('https://www.javaland.eu/de/impressum/')
        done()
      })
    })
  })

  it('should load the events', done => {
    // given ....
    // ... an empty conference
    const events = Conference.getAllEvents()
    const eventsByDay = Conference.getEventsByDay()
    expect(size(events)).to.equal(0)
    expect(size(eventsByDay)).to.equal(0)
    // when ...
    // ... initialized
    moxios.wait(function () {
      let request = moxios.requests.mostRecent()
      expect(request.url).to.equal('rest/init.json')
      request.respondWith({
        status: 200,
        // TODO: move to minimalConferenceData.js
        responseText: '{"id":"javaland2017","name":"JavaLand 2017","year":"2017","url":"http://javaland.dukecon.org/2017","homeUrl":"http://www.javaland.eu","homeTitle":null,"imprint":{"de":"https://www.javaland.eu/de/impressum/","en":"https://www.javaland.eu/en/imprint/"},"termsOfUse":{"de":"https://www.javaland.eu/de/nutzungsbedingungen/","en":"https://www.javaland.eu/en/term-of-use/"},"privacy":{"de":"https://www.javaland.eu/de/datenschutz/","en":"https://www.javaland.eu/en/privacy/"},"startDate":"2017-03-28","endDate":"2017-03-30","authEnabled":true}'
      }).then(function () {
        moxios.wait(function () {
          let request = moxios.requests.mostRecent()
          expect(request.url).to.equal('rest/conferences/javaland2017')
          request.respondWith({
            status: 200,
            responseText: JSON.stringify(minimalConferenceData.data)
          }).then(function () {
            // then ...
            // ... conference data is filled
            expect(size(events)).to.equal(3)
            expect(size(eventsByDay)).to.equal(2)
            done()
          })
        })
      })
    })
  })
})
