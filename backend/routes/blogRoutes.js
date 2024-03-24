const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const auth = require('../middlewares/auth');

/**
 * @route GET /blogs
 * @desc Get all posts
 * @access Public
 */
router.get('/blogs', blogController.getAllPosts);

/**
 * @route GET /blogs/latest
 * @desc Get all latest posts in descending order
 * @access Public
 */
router.get('/blogs/latest', blogController.getLatestPosts);

/**
 * @route GET /blogs/featured
 * @desc Get featured posts
 * @access Public
 */
router.get('/blogs/featured', blogController.getFeaturedPosts);

/**
 * @route GET /blogs/featured/:userId
 * @desc Get featured posts of a user
 * @access Public
 */
router.get('/blogs/featured/:userId', blogController.getFeaturedPostsByUser);

/**
 * @route GET /blogs/recent
 * @desc Get recent posts
 * @access Public
 */
router.get('/blogs/recent', blogController.getRecentPosts);

/**
 * @route GET /blogs/recent/:userId
 * @desc Get recent posts of a user
 * @access Public
 */
router.get('/blogs/recent/:userId', blogController.getRecentPostsByUser);

/**
 * @route GET /blogs/tags
 * @desc Get all tags
 * @access Public
 */
router.get('/blogs/tags', blogController.getAllTags);

/**
 * @route GET /blogs/:id
 * @desc Get a post by ID
 * @access Public
 */
router.get('/blogs/:id', blogController.getPostById);

/**
 * @route GET /blogs/tags/:tag
 * @desc Get posts by tag
 * @access Public
 */
router.get('/blogs/tags/:tag', blogController.getPostsByTag);

/**
 * @route GET /blogs/author/:authorId
 * @desc Get posts by author ID
 * @access Public
 */
router.get('/blogs/author/:authorId', blogController.getPostsByAuthor);

/**
 * @route POST /blogs
 * @desc Create a new post
 * @access Private
 */
router.post('/blogs', auth, blogController.createPost);

/**
 * @route GET /blogs/search
 * @desc Search posts by title or content
 * @access Public
 */
router.get('/blogs/search', blogController.searchPosts);

/**
 * @route PUT /blogs/:id
 * @desc Update a post by ID
 * @access Private
 */
router.put('/blogs/:id', auth, blogController.updatePost);

/**
 * @route DELETE /blogs/:id
 * @desc Delete a post by ID
 * @access Private
 */
router.delete('/blogs/:id', auth, blogController.deletePost);

module.exports = router;
