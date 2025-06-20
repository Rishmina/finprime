// sidenavbarcontroller.js
const pool = require('../config/db');  // Correctly import the pool

const getSideNavbarData = async (req, res) => {
  try {
    // Log user data to ensure it's populated
    console.log('User data:', req.user);  // Debugging log for user data

    // Check if the database pool is initialized
    if (!pool) {
      console.error('Database pool is not initialized.');
      return res.status(500).json({ message: 'Internal server error: Database pool issue' });
    }

    // Validate user data from the request object
    if (!req.user || !req.user.role || !req.user.email) {
      console.error('User data missing in request:', req.user);
      return res.status(400).json({ message: 'User data missing.' });
    }

    const { role, email } = req.user;

    let query = '';
    let queryParams = [email];

    if (role === 'admin') {
      query = 'SELECT id, email, role FROM users WHERE email != ?';
    } else if (role === 'subadmin') {
      query = 'SELECT id, email, role FROM users WHERE role != ? AND email != ?';
      queryParams = ['admin', email];
    } else {
      console.error('Unauthorized role:', role);
      return res.status(403).json({ message: 'Access denied.' });
    }

    // Log the query and parameters for debugging purposes
    console.log('Executing query:', query, queryParams);

    // Use async/await with Promise-based query execution
    const [results] = await pool.promise().query(query, queryParams);  // Using async/await and destructuring the result

    console.log('Query results:', results);  // Debugging log for query result

    // Check if results exist and respond accordingly
    if (results.length === 0) {
      console.log('No data found for the given query');
      return res.status(404).json({ message: 'No users found.' });
    }

    // Return filtered user data
    const safeUserData = results.map(user => {
      return {
        id: user.id,
        email: user.email,
        role: user.role
      };
    });

    res.status(200).json(safeUserData);

  } catch (error) {
    console.error('Unexpected error in getSideNavbarData:', error.stack);  // Log full error stack for debugging
    return res.status(500).json({ message: 'Internal server error: Unexpected error', error: error.message });
  }
};

module.exports = { getSideNavbarData };
