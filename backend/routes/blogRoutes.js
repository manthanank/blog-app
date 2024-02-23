const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

router.get('/blogs', blogController.getAllPosts);
router.post('/blogs', blogController.createPost);
router.get('/blogs/:id', blogController.getPostById);
router.put('/blogs/:id', blogController.updatePost);
router.delete('/blogs/:id', blogController.deletePost);
router.get('/blogs/tag/:tag', blogController.getPostsByTag);


module.exports = router;
