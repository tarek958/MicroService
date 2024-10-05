const Post = require('../models/post.model');

// Create a new post
exports.createPost = async (req, res) => {
  try {
    const { userId, content } = req.body;

    const post = new Post({
      userId,
      content,
    });

    await post.save();

    res.status(201).json({ post });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create post' });
  }
};

// Get all posts
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
};

// Get posts by userId
exports.getPostsByUserId = async (req, res) => {
  try {
    const { userId } = req.params; // Extract userId from the URL parameters

    const posts = await Post.find({ userId }); // Find posts by userId

    if (!posts.length) {
      return res.status(404).json({ error: 'No posts found for this user' });
    }

    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch posts for the user' });
  }
};

// Update a post by ID
exports.updatePost = async (req, res) => {
  try {
    const { id } = req.params; // Extract post ID from the URL parameters
    const { userId, content } = req.body;

    const post = await Post.findByIdAndUpdate(
      id,
      { userId, content },
      { new: true } // Return the updated document
    );

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.status(200).json({ post });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update post' });
  }
};

// Delete a post by ID
exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params; // Extract post ID from the URL parameters

    const post = await Post.findByIdAndDelete(id);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete post' });
  }
};


exports.likePost = async (req, res) => {
  const { postId } = req.params;
  const { userId } = req.body;

  // Check if the post exists
  const post = await Post.findById(postId);
  if (!post) {
    return res.status(404).json({ success: false, message: 'Post not found.' });
  }

  // Add the user to the likes array
  if (!post.likes.includes(userId)) {
    post.likes.push(userId);
    await post.save();
    return res.json({ success: true, message: 'Post liked successfully.' });
  } else {
    return res.json({ success: false, message: 'You already liked this post.' });
  }
};

exports.commentOnPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId, text } = req.body; // User who comments and the comment text

    // Validate input
    if (!userId || !text) {
      return res.status(400).json({ error: 'User ID and comment text are required' });
    }

    // Find the post
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Create a new comment object
    const newComment = {
      userId,
      text,
      createdAt: new Date().toISOString() // Include a createdAt timestamp
    };

    // Add the comment to the post
    post.comments.push(newComment);
    await post.save();

    // Return the full comment object in the response
    res.status(200).json({
      message: 'Comment added successfully',
      comment: newComment
    });
  } catch (err) {
    console.error("Error adding comment:", err); // Log the error for debugging
    res.status(500).json({ error: 'Failed to add comment' });
  }
};
