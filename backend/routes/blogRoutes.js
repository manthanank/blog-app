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
 * @route GET /blogs/:username
 * @desc Get all posts by username
 * @access Public
 */
router.get('/blogs/:username', blogController.getAllPostsByUsername);

/**
 * @route GET /blogs/latest/:username
 * @desc Get latest posts by username
 * @access Public
 */
router.get('/blogs/latest/:username', blogController.getLatestPostsByUsername);

/**
 * @route GET /blogs/featured/:userId
 * @desc Get featured posts of a user
 * @access Public
*/
router.get('/blogs/featured/:userId', blogController.getFeaturedPostsByUser);

/**
 * @route GET /blogs/featured/:username
 * @desc Get featured posts by username
 * @access Public
 */
router.get('/blogs/featured/:username', blogController.getFeaturedPostsByUsername);

/**
 * @route GET /blogs/:id
 * @desc Get a post by ID
 * @access Public
 */
router.get('/blogs/:id', blogController.getPostById);

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
 * @route POST /blogs/:username
 * @desc Create a new post by username
 * @access Private
 */
router.post('/blogs/:username', auth, blogController.createPostByUsername);

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
 * @route PUT /blogs/:username
 * @desc Update a post by username
 * @access Private
 */
router.put('/blogs/:username', auth, blogController.updatePostByUsername);

/**
 * @route DELETE /blogs/:id
 * @desc Delete a post by ID
 * @access Private
 */
router.delete('/blogs/:id', auth, blogController.deletePost);

/**
 * @route DELETE /blogs/:username
 * @desc Delete a post by username
 * @access Private
 */
router.delete('/blogs/:username', auth, blogController.deletePostByUsername);

module.exports = router;
