// setup.js
const { Pool } = require("pg");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

async function setup() {
  // create a user
  const username = "testUser";
  const email = "testUser@example.com";
  const password = "testPassword";
  const name = "Test User";
  const profile_picture = "https://example.com/profile.jpg";

  const hashedPassword = await bcrypt.hash(password, 10);

  await pool.query(
    "INSERT INTO users (username, email, password_hash, name, profile_picture) VALUES ($1, $2, $3, $4, $5)",
    [username, email, hashedPassword, name, profile_picture]
  );

  // get the id of the created user
  const user = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );
  const userId = user.rows[0].id;

  // create 10 random posts
  for (let i = 0; i < 10; i++) {
    const content = `This is test post ${i + 1}`;
    await pool.query(
      "INSERT INTO posts (user_id, content) VALUES ($1, $2)",
      [userId, content]
    );
  }

  console.log("Setup completed successfully");
}

setup().catch((err) => console.error(err));