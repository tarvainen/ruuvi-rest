const ruuvi = require('node-ruuvitag')
const express = require('express')
const swaggerUi = require('swagger-ui-express')
const yaml = require('js-yaml')
const fs = require('fs')
const logger = require('./src/util/logger')
const tagRouter = require('./src/router/tagRouter')
const entryRouter = require('./src/router/entryRouter')
const { addTag, updateEntryByTagId } = require('./src/util/store')

const app = express()
const swaggerDoc = yaml.safeLoad(fs.readFileSync('./swagger.yml', 'utf8'))

ruuvi.on('found', tag => {
  logger.debug(`Found tag ${tag.id}`)
  addTag(tag)

  tag.on('updated', data => {
    logger.debug(`Received data from tag ${tag.id}`, data)
    updateEntryByTagId({ ...data, timestamp: Date.now() }, tag.id)
  })
})

app.use('/tag', tagRouter)
app.use('/entry', entryRouter)

const port = process.env.PORT || 3000
const base = `http://localhost:${port}`

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDoc))

logger.info(`Swagger API documentation available at ${base}/doc`)

app.listen(port, err => err ? logger.error(err) : logger.info(`App listening on ${base}`))
