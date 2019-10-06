const ruuvi = require('node-ruuvitag')
const express = require('express')
const logger = require('./src/util/logger')
const tagRouter = require('./src/router/tagRouter')
const entryRouter = require('./src/router/entryRouter')
const docRouter = require('./src/router/docRouter')
const { addTag, updateEntryByTagId } = require('./src/util/store')
const { entryStream } = require('./src/util/stream')

const app = express()

ruuvi.on('found', tag => {
  logger.debug(`Found tag ${tag.id}`)
  addTag(tag)

  tag.on('updated', data => {
    logger.debug(`Received data from tag ${tag.id}`, data)
    entryStream.send({ tagId: tag.id, ...data })

    updateEntryByTagId({ ...data, timestamp: Date.now() }, tag.id)
  })
})

app.use('/tag', tagRouter)
app.use('/entry', entryRouter)
app.use('/doc', docRouter)

const port = process.env.PORT || 3000
const base = `http://localhost:${port}`

logger.info(`Swagger API documentation available at ${base}/doc`)

app.listen(port, err => err ? logger.error(err) : logger.info(`App listening on ${base}`))
