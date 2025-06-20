require('dotenv').config();
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

// Ensure the JWT_SECRET is defined in the environment variables
if (!JWT_SECRET) {
  console.error("JWT_SECRET is not defined in the environment variables.");
  process.exit(1); // Exit if JWT_SECRET is not found
}

const authenticate = (roles = []) => {
  return (req, res, next) => {
    // Get the token from the 'Authorization' header
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authentication failed, token missing or malformed.' });
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;

      // Optionally log decoded token only in development
      if (process.env.NODE_ENV === 'development') {
        console.log('Decoded JWT:', decoded);
      }

      // Role check: if specific roles are defined, check against user role
      if (roles.length && !roles.includes(req.user.role?.toLowerCase())) {
        return res.status(403).json({ message: 'Unauthorized role.' });
      }

      next(); // If everything is fine, proceed to the next middleware or route handler
    } catch (e) {
      console.error('Authentication error:', e.message);

      // Handle specific JWT errors
      if (e.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Authentication failed. Token expired.' });
      }

      if (e.name === 'JsonWebTokenError') {
        return res.status(401).json({ message: 'Authentication failed. Invalid token.' });
      }

      // For any other unexpected error
      return res.status(500).json({ message: 'Authentication failed. An error occurred.' });
    }
  };
};

module.exports = authenticate;
