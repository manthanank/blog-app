const BlogPost = require('../models/blogPost');

// Get all blog posts
exports.getAllPosts = async (req, res) => {
    try {
        const posts = await BlogPost.find();
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
// Get a blog post by ID
exports.getPostById = async (req, res) => {
    try {
        const post = await BlogPost.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Blog post not found' });
        }
        res.json(post);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new blog post
exports.createPost = async (req, res) => {
    const post = new BlogPost({
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
        createdAt: req.body.createdAt,
    });
    try {
        const newPost = await post.save();
        res.status(201).json(newPost);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Update a blog post
exports.updatePost = async (req, res) => {
    try {
        const post = await BlogPost.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Blog post not found' });
        }
        post.title = req.body.title;
        post.content = req.body.content;
        post.author = req.body.author;
        const updatedPost = await post.save();
        res.json(updatedPost);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a blog post
exports.deletePost = async (req, res) => {
    try {
        const post = await BlogPost.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Blog post not found' });
        }
        await post.remove();
        res.json({ message: 'Blog post deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
