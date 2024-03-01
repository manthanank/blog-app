const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

// Import routes
const blogRoutes = require('./routes/blogRoutes');
const userRoutes = require('./routes/userRoutes');

require("dotenv").config();

const dbUser = process.env.MONGODB_USER;
const dbPassword = process.env.MONGODB_PASSWORD;

// Connect to MongoDB
mongoose
    .connect(
        `mongodb+srv://${dbUser}:${dbPassword}@cluster0.re3ha3x.mongodb.net/blog-app`,
        { useNewUrlParser: true, useUnifiedTopology: true } // Add these options for MongoDB connection
    )
    .then(() => {
        console.log("Connected to MongoDB database!");
    })
    .catch((error) => {
        console.error("Connection failed!", error); // Log the error for better debugging
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

// Define routes
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
