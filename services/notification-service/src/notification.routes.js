// src/notification.routes.js
const express = require('express');
const router = express.Router();
const notificationController = require('./notification.controller');

// Route to send a notification
router.post('/send', notificationController.sendNotification);

module.exports = router;
