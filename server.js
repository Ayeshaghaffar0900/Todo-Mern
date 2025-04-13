
// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./database/db');
// const todoRoutes = require('./routes/todos');
// Load env vars
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(cors()); // Enable CORS for all origins (adjust for production)
app.use(express.json()); // To parse JSON request bodies

// Define Routes
app.get('/', (req, res) => res.send('API Running')); // Simple check route
app.use('/api/todos', require('./routes/todos')); // Mount todo routes
// app.use('/api/todos', todoRoutes);

const PORT = 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));