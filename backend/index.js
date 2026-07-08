const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

// Import routes
const blogRoutes = require('./routes/blogRoutes');
const userRoutes = require('./routes/userRoutes');
const tagRoutes = require('./routes/tagRoutes');
const commentRoutes = require('./routes/commentRoutes');

require("dotenv").config();

const dbUser = process.env.MONGODB_USER;
const dbPassword = process.env.MONGODB_PASSWORD;

// Connect to MongoDB
const mongoUri = process.env.MONGODB_URI || 
    (dbUser && dbPassword 
        ? `mongodb+srv://${dbUser}:${dbPassword}@cluster0.re3ha3x.mongodb.net/blog-app` 
        : 'mongodb://127.0.0.1:27017/blog-app');

mongoose
    .connect(
        mongoUri,
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => {
        console.log("Connected to MongoDB database!");
    })
    .catch((error) => {
        console.error("Connection failed!", error);
    });

app.use(
    cors({
        origin: "*",
    })
);
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(express.json());

// Routes
app.use('/api', userRoutes);
app.use('/api', blogRoutes);
app.use('/api', tagRoutes);
app.use('/api', commentRoutes);

// Define routes
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
