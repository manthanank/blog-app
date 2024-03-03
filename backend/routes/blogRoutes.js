const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const auth = require('../middlewares/auth');

router.get('/blogs', blogController.getAllPosts);
router.get('/blogs/featured', blogController.getFeaturedPosts);
router.get('/blogs/recent', blogController.getRecentPosts);
router.get('/blogs/tags', blogController.getAllTags);
router.get('/blogs/:id', blogController.getPostById);
router.get('/blogs/tags/:id', blogController.getPostsByTag);
router.post('/blogs', auth, blogController.createPost);
router.put('/blogs/:id', auth, blogController.updatePost);
router.delete('/blogs/:id', auth, blogController.deletePost);

module.exports = router;
