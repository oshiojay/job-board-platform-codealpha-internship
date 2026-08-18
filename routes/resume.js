const router = require('express').Router()
const {authenticate, candidateAuth} = require('../middleware/auth')
const { createResumeValidator } = require('../middleware/validation')
const {submitResume, update, deleteResume} = require('../controller/resume')

router.post('/', authenticate, candidateAuth, createResumeValidator, submitResume)
router.put('/update/:resumeId', authenticate, candidateAuth, createResumeValidator, update)
router.delete('/delete/:resumeId', authenticate, candidateAuth, deleteResume)

module.exports = router;
