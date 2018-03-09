// this is inspired by https://github.com/skybet/shonkwrap
var fs = require('fs')
var shrinkwrap = require('./npm-shrinkwrap.json')

function gitDep (rep) {
  return /^git/.test(rep)
}

function replacer (key, val) {
  // if it doesn't contain a version, leave it "as is"
  if (!this.version) {
    return val
  }
  // if we find a resolved attribute it might be skipped...
  if (key === 'resolved' && !gitDep(val) && this.from !== val) {
    return undefined
  }
  // from attributes are not needed
  if (key === 'from' && !gitDep(this.resolved)) {
    return undefined
  }
  return val
}

fs.writeFileSync('./npm-shrinkwrap.json', JSON.stringify(shrinkwrap, replacer, 2))
