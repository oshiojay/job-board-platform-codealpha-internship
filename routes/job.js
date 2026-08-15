const router = require('express').Router()
const {createJob, getOne, getAll, deleteJob} = require('../controller/job')
const {authenticate,employerAuth,candidateAuth} = require('../middleware/auth')
const { createJobValidator } = require('../middleware/validation')

router.post('/', authenticate, employerAuth, createJobValidator, createJob)
router.get('/getAll', authenticate, candidateAuth, getAll)
router.get('/:jobId', authenticate, candidateAuth, getOne)
router.delete('/delete/:id', authenticate, employerAuth, deleteJob)

module.exports = router;