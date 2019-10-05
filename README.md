# RUUVI-REST

Provide [RuuviTag](https://ruuvi.com/) data in easily consumable REST API.

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

## License

The MIT License
