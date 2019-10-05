const router = require('express').Router()
const { getLastEntryByTagId } = require('../util/store')

router.get('/:id/latest', (req, res) => {
  const { id } = req.params

  const entry = getLastEntryByTagId(id)

  if (!entry) {
    return res.status(404)
      .json({ message: 'Not found!' })
  }

  return res.json(entry)
})

module.exports = router
