const router = require('express').Router()
const swaggerUi = require('swagger-ui-express')
const yaml = require('js-yaml')
const fs = require('fs')
const path = require('path')

const swaggerDoc = yaml.safeLoad(
  fs.readFileSync(path.join(__dirname, '../../', 'swagger.yml'), 'utf8')
)

router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDoc))

module.exports = router
