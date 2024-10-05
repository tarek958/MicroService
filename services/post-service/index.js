const express = require('express');
const mongoose = require('mongoose');
const postRoutes = require('./src/routes/post.routes');

mongoose.connect('mongodb://mongo:27017/social', { useNewUrlParser: true, useUnifiedTopology: true });


const app = express();
app.use(express.json());
app.use('/api/posts', postRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Post service running on port ${PORT}`));
