const router = require('express').Router()
const { registration, verifyEmail, login } = require('../controller/user')
const { createUserValidator, verifyEmailValidator, loginValidator } = require('../middleware/validation')

router.post('/', createUserValidator, registration)
router.post('/verify', verifyEmailValidator, verifyEmail)
router.post('/login', loginValidator, login)

module.exports = router;