require("dotenv").config();  // Load environment variables
const jwt = require("jsonwebtoken");

const generateToken = (id, email, role) => {
  // Ensure secret is loaded from .env
  const secretKey = process.env.JWT_SECRET;

  if (!secretKey) {
    // Log the error but avoid printing the secret key in production
    console.error("JWT_SECRET is missing. Please check your .env file.");
    throw new Error("Missing JWT_SECRET environment variable.");
  }

  try {
    // Generate JWT token
    const token = jwt.sign(
      {
        userId: id,   // User ID from the database
        email: email,  // User email
        role: role,    // User role (admin, subadmin)
      },
      secretKey,       // Secret key for signing the token
      { expiresIn: "1h" }  // Token expiration time (1 hour)
    );

    return token;
  } catch (err) {
    console.error("Error generating token:", err);
    throw new Error("Error generating JWT token.");
  }
};

module.exports = { generateToken };
