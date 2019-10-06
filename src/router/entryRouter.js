const router = require('express').Router()
const { getLastEntryByTagId } = require('../util/store')
const { entryStream } = require('../util/stream')

router.get('/:id/latest', (req, res) => {
  const { id } = req.params

  const entry = getLastEntryByTagId(id)

  if (!entry) {
    return res.status(404)
      .json({ message: 'Not found!' })
  }

  return res.json(entry)
})

router.get('/stream', entryStream.init)

module.exports = router
