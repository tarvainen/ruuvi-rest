const ruuvi = require('node-ruuvitag')
const express = require('express')
const swaggerUi = require('swagger-ui-express')
const yaml = require('js-yaml')
const fs = require('fs')
const logger = require('./src/util/logger')

const app = express()
const swaggerDoc = yaml.safeLoad(fs.readFileSync('./swagger.yml', 'utf8'))

const tags = []
const latest = {}

ruuvi.on('found', tag => {
  logger.debug(`Found tag ${tag.id}`)
  tags.push(tag)

  tag.on('updated', data => {
    logger.debug(`Received data from tag ${tag.id}`, data)
    latest[tag.id] = { ...data, timestamp: Date.now() }
  })
})

app.get('/tag', (req, res) => res.json(tags))

app.get('/entry/:id/latest', (req, res) => {
  const { id } = req.params

  if (!latest[id]) {
    return res.status(404)
      .json({ message: 'Not found!' })
  }

  return res.json(latest[id])
})

const port = process.env.PORT || 3000
const base = `http://localhost:${port}`

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDoc))

logger.info(`Swagger API documentation available at ${base}/doc`)

app.listen(port, err => err ? logger.error(err) : logger.info(`App listening on ${base}`))
