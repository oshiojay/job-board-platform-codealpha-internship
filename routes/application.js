const router = require('express').Router()
const {application} = require('../controller/application')
const {authenticate, } = require('../middleware/validation')
const {} = require('../middleware/auth')

router.post('/', application)

module.exports = router