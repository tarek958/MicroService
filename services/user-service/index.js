const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./src/routes/user.routes');
const app = express();
app.use(express.json());
async function connectToDatabase() {
    try {
      await mongoose.connect('mongodb://mongo:27017/users', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('MongoDB connected successfully!');
    } catch (error) {
      console.error('MongoDB connection error:', error);
    }
  }
  
connectToDatabase();
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`User service running on port ${PORT}`));
