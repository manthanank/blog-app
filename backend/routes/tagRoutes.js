const express = require('express');
const router = express.Router();
const tagController = require('../controllers/tagController');

router.get('/tags', tagController.getAllTags);
router.get('/tags/:tag', tagController.getPostsByTag);

module.exports = router;