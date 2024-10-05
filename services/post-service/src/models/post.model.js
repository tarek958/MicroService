const mongoose = require('mongoose');
const { Schema } = mongoose; // Extract Schema from mongoose

const postSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  likes: [{ type: String }],
  comments: [{ 
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    text: String,
    createdAt: { type: Date, default: Date.now },
  }],
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema); // Corrected postSchema reference
module.exports = Post;
