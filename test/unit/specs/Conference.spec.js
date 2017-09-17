import moxios from 'moxios'
import Conference from '../../../src/Conference'

describe('Conference.js', () => {
  beforeEach(function () {
    moxios.install()
  })

  afterEach(function () {
    moxios.uninstall()
  })

  it('should load conference data asynchronously', done => {
    // given ....
    // ... an empty conference
    const conference = Conference.getConference()
    expect(conference.imprint['de']).to.be.undefined
    // when ...
    // ... initialized
    moxios.wait(function () {
      let request = moxios.requests.mostRecent()
      expect(request.url).to.equal('rest/init.json')
      request.respondWith({
        status: 200,
        responseText: '{"id":"javaland2017","name":"JavaLand 2017","year":"2017","url":"http://javaland.dukecon.org/2017","homeUrl":"http://www.javaland.eu","homeTitle":null,"imprint":{"de":"https://www.javaland.eu/de/impressum/","en":"https://www.javaland.eu/en/imprint/"},"termsOfUse":{"de":"https://www.javaland.eu/de/nutzungsbedingungen/","en":"https://www.javaland.eu/en/term-of-use/"},"privacy":{"de":"https://www.javaland.eu/de/datenschutz/","en":"https://www.javaland.eu/en/privacy/"},"startDate":"2017-03-28","endDate":"2017-03-30","authEnabled":true}'
      }).then(function () {
        // then ...
        // ... conference data is filled
        expect(conference.imprint['de']).to.equal('https://www.javaland.eu/de/impressum/')
        done()
      })
    })
  })
})
