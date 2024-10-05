const express = require('express');
const { createPost, getPosts, getPostsByUserId, updatePost, deletePost, likePost, commentOnPost } = require('../controllers/post.controller');
const router = express.Router();

router.post('/create', createPost);
router.get('/', getPosts);
router.get('/user/:userId', getPostsByUserId);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);
router.post('/:postId/like', likePost);
router.post('/:postId/comment', commentOnPost);
module.exports = router;
