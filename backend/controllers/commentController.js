const Comment = require('../models/comment');
const BlogPost = require('../models/blogPost');
const User = require('../models/user');

exports.getCommentsByPostId = async (req, res) => {
    try {
        const comments = await Comment.find({ postId: req.params.postId }).sort({ createdAt: -1 });
        res.json(comments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.addComment = async (req, res) => {
    const comment = new Comment({
        postId: req.params.postId,
        author: req.body.author,
        content: req.body.content
    });
    try {
        const newComment = await comment.save();
        res.status(201).json(newComment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.likeComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        comment.likes += 1;
        const updatedComment = await comment.save();
        res.json(updatedComment);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        const post = await BlogPost.findById(comment.postId);
        if (!post) {
            return res.status(404).json({ message: 'Associated blog post not found' });
        }

        // Fetch requesting user to check username ownership
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized user context' });
        }

        // Check permission: Requesting user must be comment author OR blog post author
        const isCommentAuthor = (user.username === comment.author || (user.firstName + ' ' + user.lastName) === comment.author);
        const isBlogAuthor = (post.authorId === req.user.id);

        if (!isCommentAuthor && !isBlogAuthor) {
            return res.status(403).json({ message: 'You are not authorized to delete this comment' });
        }

        await Comment.deleteOne({ _id: req.params.id });
        res.json({ message: 'Comment deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
