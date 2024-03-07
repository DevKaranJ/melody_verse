const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Pool } = require("pg");
require("dotenv").config();
const jwtSecret = process.env.JWT_SECRET;

// Express configuration
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Postgre sql configuration
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Signup endpoint
app.post("/signup", async (req, res) => {
  const { username, email, password, name, profile_picture } = req.body;

  // Check if username or email already exists
  const userExists = await pool.query(
    "SELECT * FROM users WHERE username = $1 OR email = $2",
    [username, email]
  );
  if (userExists.rows.length > 0) {
    return res.status(400).json({ error: "Username or email already exists" });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert user into database
  const newUser = await pool.query(
    "INSERT INTO users (username, email, password_hash, name, profile_picture) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [username, email, hashedPassword, name, profile_picture]
  );

  // Generate JWT token
  // The token will expire in 1 hour
  // jwtSecret as the secret key run generateSecretKey.js to generate a secret key
  const token = jwt.sign({ user_id: newUser.rows[0].id }, jwtSecret, {
    expiresIn: "1h",
  });

  res.status(200).json({ message: "User registered successfully", token });
});

// GET posts endpoint
app.get("/posts", async (req, res) => {
  // Fetch posts from database
  const posts = await pool.query("SELECT * FROM posts");
  res.status(200).json(posts.rows);
});

// Login endpoint
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Check if user exists
  const user = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );
  if (user.rows.length === 0) {
    return res.status(400).json({ error: "Invalid email or password" });
  }

  // Compare passwords
  const validPassword = await bcrypt.compare(password, user.rows[0].password_hash);
  if (!validPassword) {
    return res.status(400).json({ error: "Invalid email or password" });
  }

  // Generate JWT token
  const token = jwt.sign({ user_id: user.rows[0].id }, jwtSecret, {
    expiresIn: "1h",
  });

  res.status(200).json({ message: "Logged in successfully", token });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
