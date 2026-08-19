const router = require('express').Router()
const { authenticate } = require('../middleware/auth')
const { getMyNotifications, markAsRead } = require('../controller/notification')

router.get('/', authenticate, getMyNotifications)
router.patch('/:notificationId/read', authenticate, markAsRead)

module.exports = router
