// src/notification.controller.js
const Notification = require('./notification.model');

// Mock notification function
exports.sendNotification = (req, res) => {
    const { userId, message } = req.body;

    // Here you would integrate with a real notification service
    Notification.create({ userId, message });

    res.status(200).json({ success: true, message: 'Notification sent' });
};
