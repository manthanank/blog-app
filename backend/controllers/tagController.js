const BlogPost = require('../models/blogPost');

exports.getAllTags = async (req, res) => {
    try {
        const tags = await BlogPost.distinct('tags');
        res.json(tags);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getPostsByTag = async (req, res) => {
    try {
        // with pagination
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

        results.posts = await BlogPost.find({ tags: req.params.tag }).sort({ createdAt: -1 }).limit(limit).skip(startIndex).exec();
        res.json(results);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};