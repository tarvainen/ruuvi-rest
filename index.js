const ruuvi = require('node-ruuvitag')
const express = require('express')
const app = express()

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

app.listen(process.env.PORT || 3000, err => err && console.error(err))
