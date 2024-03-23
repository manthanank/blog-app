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

        results.posts = await BlogPost.find().sort({ createdAt: -1 }).limit(limit).skip(startIndex).exec();
        res.json(results);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get latest blog posts
exports.getLatestPosts = async (req, res) => {
    try {
        const posts = await BlogPost.find().sort({ createdAt: -1 });
        res.json(posts);
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

// get featured blog posts by user
exports.getFeaturedPostsByUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const posts = await BlogPost.find({ authorId: userId, featured: true });
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get recent blog posts by user
exports.getRecentPostsByUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const posts = await BlogPost.find({ authorId: userId }).sort({ createdAt: -1 }).limit(3);
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

// Get blog posts by author ID
exports.getPostsByAuthor = async (req, res) => {
    try {
        const authorId = req.params.authorId;
        const posts = await BlogPost.find({ authorId: authorId });
        res.json(posts);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

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
        desc: req.body.desc,
        content: req.body.content,
        author: req.body.author,
        tags: req.body.tags,
        createdAt: req.body.createdAt,
        featured: req.body.featured,
        authorId: req.body.authorId
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
        
        // Check if the current user is the creator of the post
        if (post.authorId !== req.user.id) {
            return res.status(403).json({ message: 'You are not authorized to update this post' });
        }
        
        post.slug = req.body.title.toLowerCase().split(' ').join('-');
        post.title = req.body.title;
        post.desc = req.body.desc;
        post.content = req.body.content;
        post.tags = req.body.tags;
        post.featured = req.body.featured;
        
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
