const router = require('express').Router()
const { registration, verifyEmail, login } = require('../controller/user')

router.post('/', registration)
router.post('/verify', verifyEmail)
router.post('/login', login)

module.exports = router;