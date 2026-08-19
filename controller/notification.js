const notificationModel = require('../model/notification')

exports.getMyNotifications = async (req, res) => {
    try {
        const notifications = await notificationModel
            .find({ recipientId: req.user.id })
            .sort({ createdAt: -1 })
            .populate('jobId', 'title location jobType')
            .populate('applicationId', 'status')

        res.status(200).json({
            message: 'Notifications retrieved successfully',
            data: notifications,
            unreadCount: notifications.filter((notification) => !notification.isRead).length
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: 'Something went wrong' })
    }
}

exports.markAsRead = async (req, res) => {
    try {
        const notification = await notificationModel.findOneAndUpdate(
            { _id: req.params.notificationId, recipientId: req.user.id },
            { isRead: true },
            { new: true }
        )

        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' })
        }

        res.status(200).json({
            message: 'Notification marked as read',
            data: notification
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: 'Something went wrong' })
    }
}
