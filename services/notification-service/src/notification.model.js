// src/notification.model.js
// Simple in-memory storage for notifications. You would typically use a database here.
let notifications = [];

class Notification {
    static create(data) {
        notifications.push(data);
        return data;
    }

    static findByUser(userId) {
        return notifications.filter(notification => notification.userId === userId);
    }
}

module.exports = Notification;
