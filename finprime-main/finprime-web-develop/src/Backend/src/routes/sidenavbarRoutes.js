const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authMiddleware'); // Import the authentication middleware
const { getSideNavbarData } = require('../controllers/sidenavbarcontroller'); // Import the controller

// Ensure getSideNavbarData controller is properly imported (it's good practice, but not required in most cases)
if (!getSideNavbarData) {
  console.error('getSideNavbarData controller is missing.');
}

// Define the route for fetching side navbar data, using the authenticate middleware
router.get('/admin', authenticate(['admin', 'subadmin']), getSideNavbarData);

// Export the router to be used in the main server file
module.exports = router;
