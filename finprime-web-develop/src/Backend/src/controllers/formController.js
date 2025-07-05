const db = require('../config/db'); // Import db connection
const util = require('util');
const queryAsync = util.promisify(db.query).bind(db); // Promisify db.query

/**
 * Handle form submission
 */
const submitForm = async (req, res) => {
  try {
    const { companyName, firstName, lastName, email, phone, service, subService } = req.body;

    // Validate input
    if (!companyName || !firstName || !lastName || !email || !phone || !service || !subService) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // SQL query to insert form data
    const query = `
      INSERT INTO form_submissions 
      (companyName, firstName, lastName, email, phone, service, subService) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    await queryAsync(query, [companyName, firstName, lastName, email, phone, service, subService]);
    res.status(200).json({ message: 'Form submitted successfully!' });
  } catch (err) {
    console.error('Error saving form data:', err.message);
    res.status(500).json({ message: 'Error saving form data' });
  }
};

/**
 * Retrieve form submissions
 */
const getFormSubmissions = async (req, res) => {
  try {
    // SQL query to fetch form submissions
    const query = `
      SELECT 
        id, companyName, firstName, lastName, email, phone, service, subService, submitted_at 
      FROM form_submissions 
      ORDER BY submitted_at DESC
    `;

    const results = await queryAsync(query); // Await query results
    console.log('Form submissions retrieved successfully:', results.length);
    res.status(200).json(results); // Return form submissions as JSON
  } catch (err) {
    console.error('Error fetching submissions:', err.message);
    res.status(500).json({ message: 'Failed to retrieve submissions' });
  }
};

module.exports = { submitForm, getFormSubmissions };
