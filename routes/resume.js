const router = require('express').Router()
const {authenticate,candidateAuth} = require('../middleware/auth')
const {submitResume,update, deleteResume} = require('../controller/resume')

router.post('/', authenticate, candidateAuth, submitResume)
router.put('/update/:resumeId', authenticate, candidateAuth, update)
router.delete('/delete/:resumeId', authenticate, candidateAuth, deleteResume)

module.exports = router;