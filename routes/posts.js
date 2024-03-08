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

router.use((req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(403).json({ error: 'No token provided.' });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error('Failed to verify token: ', err);
      return res.status(403).json({ error: 'Failed to authenticate token.' });
    }

    req.userId = decoded.user_id; // store the user id from the token in the request object
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