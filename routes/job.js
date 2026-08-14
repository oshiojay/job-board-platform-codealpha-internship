const router = require('express').Router()
const {createJob} = require('../controller/job')
const {}

router.post('/', createJob)

module.exports = router;