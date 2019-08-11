// This is a karma config file. For more details see
//   http://karma-runner.github.io/0.13/config/configuration-file.html
// we are also using it with karma-webpack
//   https://github.com/webpack/karma-webpack

var webpackConfig = require('../../build/webpack.test.conf')

const isDocker = require('is-docker')();

process.env.CHROME_BIN = isDocker ? '/opt/google/chrome/chrome'
  : function () {
    const puppeteer = require('puppeteer-core')
    puppeteer.executablePath()
  }

module.exports = function (config) {
  config.set({
    // to run in additional browsers:
    // 1. install corresponding karma launcher
    //    http://karma-runner.github.io/4.0/config/browsers.html
    // 2. add it to the `browsers` array below.
    // logLevel: config.LOG_DEBUG,
    browsers: ['ChromeHeadlessCustom'],
    captureConsole: true,
    customLaunchers: {
      ChromeHeadlessCustom: {
        base: 'ChromeHeadless',
        flags: isDocker ? [
            '--no-sandbox',
            '--enable-logging=stderr',
            '--v=1',
            '--disable-web-security'
          ]
          : []
      }
    },
    frameworks: ['mocha', 'sinon-chai'],
    reporters: ['spec', 'coverage'],
    files: [
      '../../node_modules/babel-polyfill/dist/polyfill.js',
      './index.js'
    ],
    proxies: {
      '/static/': '/static/'
    },
    preprocessors: {
      './index.js': ['webpack', 'sourcemap']
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true
    },
    coverageReporter: {
      dir: './coverage',
      reporters: [
        { type: 'lcov', subdir: '.' },
        { type: 'text-summary' }
      ]
    }
  })
}
