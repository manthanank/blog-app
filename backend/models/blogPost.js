const mongoose = require('mongoose');

// Define the blog schema
const blogSchema = new mongoose.Schema({
  // Add slug field
  slug: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  authorId: {
    type: String,
    required: true
  },
  tags: {
    type: [String],
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  featured: {
    type: Boolean,
    default: false
  },
  visitCount: {
    type: Number,
    default: 0
  }
});

blogSchema.index({ title: 'text', tags: 'text', content: 'text' });

// Create the Blog model using the blog schema
const Blog = mongoose.model('Blog', blogSchema);

// Export the Blog model
module.exports = Blog;
