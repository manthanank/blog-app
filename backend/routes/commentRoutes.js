const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const auth = require('../middlewares/auth');

router.get('/comments/post/:postId', commentController.getCommentsByPostId);
router.post('/comments/post/:postId', commentController.addComment);
router.put('/comments/like/:id', commentController.likeComment);
router.delete('/comments/:id', auth, commentController.deleteComment);

module.exports = router;
