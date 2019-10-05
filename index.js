const ruuvi = require('node-ruuvitag')
const express = require('express')
const swaggerUi = require('swagger-ui-express')
const yaml = require('js-yaml')
const fs = require('fs')

const app = express()
const swaggerDoc = yaml.safeLoad(fs.readFileSync('./swagger.yml', 'utf8'))

const tags = []
const latest = {}

ruuvi.on('found', tag => {
  tags.push(tag)

  tag.on('updated', data => {
    latest[tag.id] = { ...data, timestamp: Date.now() }
  })
})

app.get('/tag', (req, res) => res.json(tags))

app.get('/tag/:id', (req, res) => {
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

console.log(`Swagger API documentation available at ${base}/doc`)

app.listen(port, err => err ? console.error(err) : console.log(`App listening on ${base}`))
