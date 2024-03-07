const express = require("express");
const { Pool } = require("pg");
const jwt = require('jsonwebtoken');
require("dotenv").config();

const router = express.Router();
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Middleware for checking authentication
router.use((req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ error: 'No token provided.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err) => {
    if (err) {
      return res.status(403).json({ error: 'Failed to authenticate token.' });
    }

    next();
  });
});

// endpoint for creating a new post
router.get("/", async (req, res) => {
  const page = req.query.page || 1; // extract the page query parameter 
  const size = req.query.size || 10; // extract the size query parameter
  const offset = (page - 1) * size; // calculate the offset based on the page and size

  const posts = await pool.query("SELECT * FROM posts ORDER BY id LIMIT $1 OFFSET $2", [size, offset]);
  res.status(200).json(posts.rows);
});

module.exports = router;