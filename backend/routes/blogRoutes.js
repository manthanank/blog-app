const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const auth = require('../middlewares/auth');

router.get('/blogs', blogController.getAllPosts);
router.get('/blogs/latest', blogController.getLatestPosts);
router.get('/blogs/:id', blogController.getPostById);
router.get('/blogs/all/:username', blogController.getAllPostsByUsername);
router.get('/blogs/featured/:username', blogController.getFeaturedPostsByUsername);
router.post('/blogs', auth, blogController.createPost);
router.put('/blogs/visit/:id', blogController.incrementVisitCount);
router.put('/blogs/:id', auth, blogController.updatePost);
router.delete('/blogs/:id', auth, blogController.deletePost);

module.exports = router;
