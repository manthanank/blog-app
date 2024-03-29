const express = require('express');
const router = express.Router();
const tagController = require('../controllers/tagController');

/**
 * @route GET /tags
 * @desc Get all tags
 * @access Public
 */
router.get('/tags', tagController.getAllTags);

/**
 * @route GET /tags/:tag
 * @desc Get posts by tag
 * @access Public
 */
router.get('/tags/:tag', tagController.getPostsByTag);

module.exports = router;