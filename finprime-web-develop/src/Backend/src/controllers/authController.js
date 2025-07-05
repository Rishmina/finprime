const bcrypt = require("bcryptjs");
const db = require("../config/db").promise();
const { generateToken } = require("../utils/bcryptUtils");

// Email validation function
const validateEmail = (email) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return regex.test(email);
};

const registerController = async (req, res) => {
  const { email, password, role } = req.body;

  // Validate inputs
  if (!email || !password || !role || email.trim() === '' || password.trim() === '' || role.trim() === '') {
    return res.status(400).json({ message: "Email, password, and role are required" });
  }

  // Validate email format
  if (!validateEmail(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  // Check if the role is valid
  const validRoles = ['admin', 'subadmin'];
  if (!validRoles.includes(role)) {
    return res.status(400).json({ message: "Invalid role. Choose 'admin' or 'subadmin'" });
  }

  try {
    // Check if user already exists
    const [existingUser] = await db.query('SELECT email FROM users WHERE email = ?', [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user into database
    const [newUser] = await db.query('INSERT INTO users (email, password, role) VALUES (?, ?, ?)', [
      email, 
      hashedPassword, 
      role
    ]);

    if (newUser.affectedRows === 0) {
      return res.status(500).json({ message: "Error saving the user to the database." });
    }

    // Generate a JWT token for the new user
    const token = generateToken(newUser.insertId, email, role);

    // Return the token
    res.status(201).json({ status: "success", token });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ message: "Something went wrong", error: err.message });
  }
};

const loginController = async (req, res) => {
  const { email, password } = req.body;

  // Validate inputs
  if (!email || !password || email.trim() === '' || password.trim() === '') {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    // Query the user from the database by email
    const [rows] = await db.query('SELECT id, email, password, role FROM users WHERE email = ?', [email]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = rows[0];

    // Compare the hashed password with the stored password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // Generate JWT token if login is successful
    const token = generateToken(user.id, user.email, user.role);

    res.json({ status: "success", token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Something went wrong", error: err.message });
  }
};

module.exports = { registerController, loginController };
