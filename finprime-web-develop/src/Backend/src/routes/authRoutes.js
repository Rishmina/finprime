// routes/authRoutes.js
const express = require("express");
const { loginController, registerController } = require("../controllers/authController");

const router = express.Router();

// Login route
router.post("/login", loginController);

// Register route
router.post("/register", registerController);

module.exports = router;
