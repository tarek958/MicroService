// index.js
const express = require('express');
const app = express();
const notificationRoutes = require('./src/notification.routes');

app.use(express.json());

// Routes
app.use('/api/notifications', notificationRoutes);

// Start the server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Notification service running on port ${PORT}`);
});
