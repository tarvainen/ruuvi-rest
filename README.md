# RUUVI-REST

[![Actions Status](https://github.com/tarvainen/ruuvi-rest/workflows/CI/badge.svg)](https://github.com/tarvainen/ruuvi-rest/actions)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Provide [RuuviTag](https://ruuvi.com/) data in easily consumable REST API - tiny wrapper to hide the nasty BLE hassle.

## Installation

### Requirements

* Node 8

```
npm install
npm start
```

## API Documentation

Once app started, the Swagger API documentation is available at http://localhost:3000/doc (or https://whereveryourappisrunning.com/doc).

## Configuration

### Log level

`LOG_LEVEL` environment variable may be used to change log level. Defaults to 'info'.

```
LOG_LEVEL=(debug|info|warning|error) npm start
```

## Subscribing entries (SSE)

API has an endpoint `/entry/stream` to listen entry stream (SSE).

Example client code:

```
const source = new EventSource('http://localhost:3000/entry/stream')

source.addEventListener('message', evt => console.log(JSON.parse(evt.data)))

// --> { tagId: "d151ff0290804d86b80f20e9ae9a823e", dataFormat: 3, rssi: -90, humidity: 52.5, temperature: 16.57, ... }
```

## License

The MIT License
