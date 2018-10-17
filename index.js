'use strict'

const addSecretListener = require('secret-event-listener')

module.exports = function streamObserver (stream, cb) {
  addSecretListener(stream, 'data', cb)
  return function stop () {
    stream.removeListener('data', cb)
  }
}
