import moxios from 'moxios'
import Images from '../../../src/Images'

describe('Images.js', () => {
  beforeEach(function () {
    moxios.install()
    Images.reset()
  })

  afterEach(function () {
    moxios.uninstall()
  })

  it('should have default images', done => {
    // given ....
    // ... an empty conference image
    const images = Images.getImages()

    // when ...
    // ... initialized
    moxios.wait(function () {
      const request = moxios.requests.mostRecent()
      expect(request.url).to.equal('rest/image-resources.json')
      request.respondWith({
        status: 200,
        responseText: '{}'
      }).then(function () {
        // then ...
        // ... image data is filled
        var image = require('@/assets/img/logo_dukecon.png')
        var favicon = require('@/assets/img/favicon.ico')
        expect(images.conferenceImage).to.include(image)
        expect(images.conferenceFavIcon).to.include(favicon)
        expect(images.defaultImage).to.include('data:image/gif;base64,R0lGOD')
        done()
      })
    })
  })

  it('should load image data asynchronously', done => {
    // given ....
    // ... an empty conference image
    const images = Images.getImages()
    expect(images.defaultImage).to.include('data:image/gif;base64,R0lGOD')

    // when ...
    // ... initialized
    moxios.wait(function () {
      const request = moxios.requests.mostRecent()
      expect(request.url).to.equal('rest/image-resources.json')
      request.respondWith({
        status: 200,
        responseText: '{"conferenceImage":"a-new-image"}'
      }).then(function () {
        // then ...
        // ... image data is filled
        expect(images.conferenceImage).to.equal('a-new-image')
        done()
      })
    })
  })
})
