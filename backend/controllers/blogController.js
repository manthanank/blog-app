const BlogPost = require('../models/blogPost');

// Get all blog posts
exports.getAllPosts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const results = {};

        if (endIndex < await BlogPost.countDocuments().exec()) {
            results.next = {
                page: page + 1,
                limit: limit
            };
        }

        if (startIndex > 0) {
            results.previous = {
                page: page - 1,
                limit: limit
            };
        }

        results.posts = await BlogPost.find().limit(limit).skip(startIndex).exec();
        res.json(results);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// get featured blog posts
exports.getFeaturedPosts = async (req, res) => {
    try {
        const posts = await BlogPost.find({ featured: true });
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get recent blog posts
exports.getRecentPosts = async (req, res) => {
    try {
        const posts = await BlogPost.find().sort({ createdAt: -1 }).limit(3);
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

// Get all tags
exports.getAllTags = async (req, res) => {
    try {
        const tags = await BlogPost.distinct('tags');
        res.json(tags);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get blog posts by tag
exports.getPostsByTag = async (req, res) => {
    try {
        const tag = req.params.tag;
        const posts = await BlogPost.find({ tags: tag });
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Add search route
exports.searchPosts = async (req, res) => {
    try {
        const query = req.params.query;
        const posts = await BlogPost.find({ $text: { $search: query } });
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new blog post
exports.createPost = async (req, res) => {
    const post = new BlogPost({
        slug: req.body.title.toLowerCase().split(' ').join('-'),
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
        tags: req.body.tags,
        createdAt: req.body.createdAt,
        featured: req.body.featured
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
        post.slug = req.body.title.toLowerCase().split(' ').join('-');
        post.title = req.body.title;
        post.desc = req.body.desc;
        post.content = req.body.content;
        post.author = req.body.author;
        post.tags = req.body.tags;
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
        await BlogPost.deleteOne({ _id: req.params.id }); // Use deleteOne method to delete the blog post
        res.json({ message: 'Blog post deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
