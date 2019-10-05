const router = require('express').Router()
const { getTags } = require('../util/store')

router.get('/', (req, res) => res.json(getTags()))

module.exports = router
