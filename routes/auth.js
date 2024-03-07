const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Pool } = require("pg");
require("dotenv").config();
const jwtSecret = process.env.JWT_SECRET;

const router = express.Router();
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

router.post("/signup", async (req, res) => {
  const { username, email, password, name, profile_picture } = req.body;

  const userExists = await pool.query(
    "SELECT * FROM users WHERE username = $1 OR email = $2",
    [username, email]
  );
  if (userExists.rows.length > 0) {
    return res.status(400).json({ error: "Username or email already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await pool.query(
    "INSERT INTO users (username, email, password_hash, name, profile_picture) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [username, email, hashedPassword, name, profile_picture]
  );

  const token = jwt.sign({ user_id: newUser.rows[0].id }, jwtSecret, {
    expiresIn: "1h",
  });

  res.status(200).json({ message: "User registered successfully", token });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );
  if (user.rows.length === 0) {
    return res.status(400).json({ error: "Invalid email or password" });
  }

  const validPassword = await bcrypt.compare(password, user.rows[0].password_hash);
  if (!validPassword) {
    return res.status(400).json({ error: "Invalid email or password" });
  }

  const token = jwt.sign({ user_id: user.rows[0].id }, jwtSecret, {
    expiresIn: "1h",
  });

  res.status(200).json({ message: "Logged in successfully", token });
});

module.exports = router;