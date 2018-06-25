# stream-observer

Listen for `data` events on a readable stream without triggering flowing
mode.

[![npm](https://nodei.co/npm/stream-observer.png)](https://www.npmjs.com/package/stream-observer)

[![Build status](https://travis-ci.org/watson/stream-observer.svg?branch=master)](https://travis-ci.org/watson/stream-observer)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

## Why?

Normally a readable stream will start to emit `data` events (i.e. enter
"flowing mode") right after you attach the first `data` event listener.

But sometimes it's desirable to attach a `data` event listener without
the side effect of enabling flowing mode.

E.g. if you want to subscribe to the content of a stream but are not in
charge of when the stream starts flowing - say for instance if you hand
the stream off to someone else that are not attaching their own `data`
event listener right away.

This module gives you that ability.

## Installation

```
npm install stream-observer --save
```

## Usage

```js
const fs = require('fs')
const streamObserver = require('stream-observer')

const stream = fs.createReadStream(__filename)

// Register observer to listen for data events once the stream starts
// flowing. Callback will be called with the data chunks.
streamObserver(stream, function (chunk) {
  console.log(`stream produced ${chunk.length} bytes of data`)
})

// Wait a little before starting to read data from the stream.
setTimeout(function () {
  stream.pipe(process.stdout)
}, 1000)
```

## API

### `fn = streamObserver(stream, callback)`

Arguments:

- `stream` - the readable stream you wish to observe
- `callback` - the callback will be attached to the `data` event of the
  `stream` without triggering flowing mode

Returns a function that you can call if you want to observer to stop
observing.

## License

[MIT](https://github.com/watson/stream-observer/blob/master/LICENSE)
