// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'default e2e tests': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .waitForElementVisible('#talks-grid', 5000)
      .assert.containsText('#talks-grid div.title a', 'Pipeline as code: Continuous Delivery with Jenkins 2')
      .end()
  }
}
