'use strict'

const test = require('tape')
const PassThrough = require('stream').PassThrough
const streamObserver = require('./')

test('data listener attached in same tick', function (t) {
  t.plan(2)

  const stream = new PassThrough()
  stream.write('hello world')

  streamObserver(stream, function (chunk) {
    t.equal(chunk.toString(), 'hello world', 'observer should get chunk')
  })

  stream.on('data', function (chunk) {
    t.equal(chunk.toString(), 'hello world', 'regular listener should get chunk')
  })
})

test('data listener attached several ticks later', function (t) {
  t.plan(2)

  const stream = new PassThrough()
  stream.write('hello world')

  streamObserver(stream, function (chunk) {
    t.equal(chunk.toString(), 'hello world', 'observer should get chunk')
  })

  setTimeout(function () {
    stream.on('data', function (chunk) {
      t.equal(chunk.toString(), 'hello world', 'regular listener should get chunk')
    })
  }, 100)
})

test('stop observer in same tick', function (t) {
  t.plan(1)

  const stream = new PassThrough()
  stream.write('hello world')

  const stop = streamObserver(stream, function (chunk) {
    t.fail('should observe any data')
  })

  stop()

  stream.on('data', function (chunk) {
    t.equal(chunk.toString(), 'hello world', 'regular listener should get chunk')
  })
})

test('stop observer several ticks later', function (t) {
  t.plan(3)

  const stream = new PassThrough()
  stream.write('hello')

  const stop = streamObserver(stream, function (chunk) {
    t.equal(chunk.toString(), 'hello', 'observer should get chunk')
  })

  setTimeout(function () {
    const chunks = ['hello', 'world']
    stream.on('data', function (chunk) {
      t.equal(chunk.toString(), chunks.shift(), 'regular listener should get chunk')
      if (chunks.length === 1) {
        stop()
        stream.end('world')
      }
    })
  }, 100)
})
