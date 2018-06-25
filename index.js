'use strict'

const addSerectListener = require('secret-event-listener')

module.exports = function streamObserver (stream, cb) {
  addSerectListener(stream, 'data', cb)
  return function stop () {
    stream.removeListener('data', cb)
  }
}
