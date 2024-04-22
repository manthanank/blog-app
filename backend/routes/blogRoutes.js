const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const auth = require('../middlewares/auth');

router.get('/blogs', blogController.getAllPosts);
router.get('/blogs/latest', blogController.getLatestPosts);
router.get('/blogs/:id', blogController.getPostById);
router.get('/blogs/all/:username', blogController.getAllPostsByUsername);
router.get('/blogs/featured/:username', blogController.getFeaturedPostsByUsername);
router.get('/blogs/author/:authorId', blogController.getPostsByAuthor);
router.get('/blogs/search', blogController.searchPosts);
router.post('/blogs', auth, blogController.createPost);
router.post('/blogs/:username', auth, blogController.createPostByUsername);
router.put('/blogs/:id', auth, blogController.updatePost);
router.put('/blogs/:username', auth, blogController.updatePostByUsername);
router.delete('/blogs/:id', auth, blogController.deletePost);
router.delete('/blogs/:username', auth, blogController.deletePostByUsername);

module.exports = router;
