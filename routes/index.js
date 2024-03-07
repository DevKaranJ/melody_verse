const express = require("express");
const authRoutes = require("./auth");
const postRoutes = require("./posts");

const router = express.Router();

// Mount the routes
router.use("/", authRoutes);
router.use("/posts", postRoutes);

module.exports = router;