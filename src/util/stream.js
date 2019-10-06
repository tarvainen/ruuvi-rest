const SSE = require('express-sse')

const entryStream = new SSE()

module.exports = { entryStream }
