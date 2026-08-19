const router = require('express').Router()
const { application, updateApplicationStatus } = require('../controller/application')
const {} = require('../middleware/validation')
const { authenticate, candidateAuth, employerAuth } = require('../middleware/auth')

router.post('/:jobId/:resumeId', authenticate, candidateAuth, application)
router.patch('/:applicationId/status', authenticate, employerAuth, updateApplicationStatus)

module.exports = router
