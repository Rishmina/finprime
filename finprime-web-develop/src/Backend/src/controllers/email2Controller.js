// const nodemailer = require("nodemailer");
// const db = require("../config/db");
// const validator = require("validator");

// const sendEmail = async (req, res) => {
//   const { name, email } = req.body;

//   console.log("Received data:", req.body);  // Debug log to check data

//   try {
//     // Validate email format
//     if (!email || !validator.isEmail(email)) {
//       return res.status(400).json({ error: "Invalid email format." });
//     }

//     // Validate other fields (name, company) if necessary
//     if (!name || name.trim() === "") {
//       return res.status(400).json({ error: "Name is required." });
//     }

//     // Log the query parameters before insertion
//     console.log("Query parameters:", [name || null, email]);

//     // Insert inquiry into the database
//     try {
//         const [result] = await db.promise().query(
//             "INSERT INTO inquiries2 (name, email) VALUES (?, ?)",
//             [name || null, email]
//           );
          
//         console.log("Database insert result:", result);
//       } catch (dbError) {
//         console.error("Database error:", dbError);  // Log the full error for debugging
//         return res.status(500).json({
//           error: "Database insertion failed.",
//           details: dbError.message,
//           stack: dbError.stack  // Include the stack trace for debugging
//         });
//       }

//     // Check if email credentials are set
//     if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
//       console.error("Missing email credentials");
//       return res.status(500).json({ error: "Email credentials are missing." });
//     }

//     // Setup Nodemailer transporter
//     const transporter = nodemailer.createTransport({
//       service: "Gmail",
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//       logger: true, // Enable logging for debugging
//     });

//     // Prepare admin email options
//     const adminMailOptions = {
//       from: process.env.EMAIL_USER,
//       to: "razimuhammed055@gmail.com", // Admin email
//       subject: "New Inquiry: Speak to an Expert",
//       html: `
//         <h3>New Inquiry from ${name}</h3>
//         <p><strong>Email:</strong> ${email}</p>
//       `,
//     };

//     // Prepare customer email options
//     const customerMailOptions = {
//       from: process.env.EMAIL_USER,
//       to: email,
//       subject: "Thank you for your inquiry",
//       html: `
//         <h3>Dear ${name},</h3>
//         <p>Thank you for reaching out to us. We have received your inquiry and will get back to you shortly.</p>
//         <p>Here are the details you provided:</p>
//         <ul>
//           <li><strong>Email:</strong> ${email}</li>
//         </ul>
//         <p>Best regards,<br>Your Company Name</p>
//       `,
//     };

//     // Send both emails concurrently
//     try {
//       await Promise.all([
//         transporter.sendMail(adminMailOptions),
//         transporter.sendMail(customerMailOptions),
//       ]);
//       console.log("Emails sent successfully.");
//       // Return success response
//       res.status(201).json({ message: "Inquiry saved and emails sent successfully!" });
//     } catch (emailError) {
//       console.error("Email sending error:", emailError);
//       return res.status(500).json({ error: "Failed to send emails." });
//     }
//   } catch (error) {
//     console.error("Error during inquiry process:", error);
//     return res.status(500).json({
//       error: "Failed to process the inquiry.",
//       details: error.message,
//       stack: error.stack  // Include the stack trace for debugging
//     });
//   }
// };

// const getMails = async (req, res) => {
//     try {
//       const [subscribers] = await db.promise().query(`
//         SELECT id, name, email, created_at
//         FROM inquiries2
//         ORDER BY created_at DESC
//       `);
//       res.status(200).json(subscribers);
//     } catch (error) {
//       console.error("Error fetching subscribers:", error);
//       res.status(500).json({ error: "Failed to fetch subscribers." });
//     }
//   };
  
  

// module.exports = { sendEmail,getMails };





// const nodemailer = require("nodemailer");
// const db = require("../config/db");
// const validator = require("validator");

// const sendEmail = async (req, res) => {
//   const { name, company, email, mobile } = req.body;

//   console.log("Received data:", req.body);  // Debug log to check data

//   try {
//     // Validate email format
//     if (!email || !validator.isEmail(email)) {
//       return res.status(400).json({ error: "Invalid email format." });
//     }

//     // Validate mobile number (optional: regex for phone number format)
//     if (!mobile || !/^\d{10}$/.test(mobile)) {
//       return res.status(400).json({ error: "Invalid mobile number." });
//     }

//     // Validate other fields (name, company) if necessary
//     if (!name || name.trim() === "") {
//       return res.status(400).json({ error: "Name is required." });
//     }

//     // Log the query parameters before insertion
//     console.log("Query parameters:", [name, company || null, email, mobile]);

//     // Insert inquiry into the database
//     try {
//         const [result] = await db.promise().query(
//             "INSERT INTO inquiries (name, company, email, mobile) VALUES (?, ?, ?, ?)",
//             [name, company || null, email, mobile]
//           );
          
//         console.log("Database insert result:", result);
//       } catch (dbError) {
//         console.error("Database error:", dbError);  // Log the full error for debugging
//         return res.status(500).json({
//           error: "Database insertion failed.",
//           details: dbError.message,
//           stack: dbError.stack  // Include the stack trace for debugging
//         });
//       }

//     // Check if email credentials are set
//     if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
//       console.error("Missing email credentials");
//       return res.status(500).json({ error: "Email credentials are missing." });
//     }

//     // Setup Nodemailer transporter
//     const transporter = nodemailer.createTransport({
//       service: "Gmail",
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//       logger: true, // Enable logging for debugging
//     });

//     // Prepare admin email options
//     const adminMailOptions = {
//       from: process.env.EMAIL_USER,
//       to: "razimuhammed055@gmail.com", // Admin email
//       subject: "New Inquiry: Speak to an Expert",
//       html: `
//         <h3>New Inquiry from ${name}</h3>
//         <p><strong>Company:</strong> ${company || "N/A"}</p>
//         <p><strong>Email:</strong> ${email}</p>
//         <p><strong>Mobile:</strong> ${mobile}</p>
//       `,
//     };

//     // Prepare customer email options
//     const customerMailOptions = {
//       from: process.env.EMAIL_USER,
//       to: email,
//       subject: "Thank you for your inquiry",
//       html: `
//         <h3>Dear ${name},</h3>
//         <p>Thank you for reaching out to us. We have received your inquiry and will get back to you shortly.</p>
//         <p>Here are the details you provided:</p>
//         <ul>
//           <li><strong>Company:</strong> ${company || "N/A"}</li>
//           <li><strong>Email:</strong> ${email}</li>
//           <li><strong>Mobile:</strong> ${mobile}</li>
//         </ul>
//         <p>Best regards,<br>Your Company Name</p>
//       `,
//     };

//     // Send both emails concurrently
//     try {
//       await Promise.all([
//         transporter.sendMail(adminMailOptions),
//         transporter.sendMail(customerMailOptions),
//       ]);
//       console.log("Emails sent successfully.");
//       // Return success response
//       res.status(201).json({ message: "Inquiry saved and emails sent successfully!" });
//     } catch (emailError) {
//       console.error("Email sending error:", emailError);
//       return res.status(500).json({ error: "Failed to send emails." });
//     }
//   } catch (error) {
//     console.error("Error during inquiry process:", error);
//     return res.status(500).json({
//       error: "Failed to process the inquiry.",
//       details: error.message,
//       stack: error.stack  // Include the stack trace for debugging
//     });
//   }
// };

// const getMails = async (req, res) => {
//     try {
//       const [mails] = await db.promise().query(`
//         SELECT id, name, company, email, mobile, created_at
//         FROM inquiries
//         ORDER BY created_at DESC
//       `);
//       res.status(200).json(mails);
//     } catch (error) {
//       console.error("Error fetching mails:", error);
//       res.status(500).json({ error: "Failed to fetch mails." });
//     }
//   };
  
  

// module.exports = { sendEmail,getMails };

const db = require('../config/db'); // Import db connection
const util = require('util');
const queryAsync = util.promisify(db.query).bind(db); // Promisify db.query

const sendEmail = async (req, res) => {
  try {
    const { name, email } = req.body;

    // Validate input
    if (!name || !email) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // SQL query to insert form data
    const query = `
      INSERT INTO inquiries2 (name, email) 
      VALUES (?, ?)
    `;
    
    // Execute the query
    await queryAsync(query, [name, email]);

    res.status(200).json({ message: 'Form submitted successfully!' });
  } catch (err) {
    console.error('Error saving form data:', {
      message: err.message,
      stack: err.stack, // Log stack trace for debugging
    });
    res.status(500).json({ message: 'Failed to save form data' });
  }
};


/**
 * Retrieve form submissions
 */
const getMails = async (req, res) => { 
  try {
    // Ensure column name is correct in the query
    const query = `SELECT id, name, email, created_at FROM inquiries2 ORDER BY created_at DESC`;
    console.log('Executing query:', query); // Be cautious with logging sensitive data

    const results = await queryAsync(query);
    console.log('Form submissions retrieved successfully:', results.length);
    
    if (!results || results.length === 0) {
      return res.status(404).json({ message: 'No submissions found' });
    }

    res.status(200).json(results);
  } catch (err) {
    console.error('Error fetching submissions:', {
      message: err.message,
      stack: err.stack, // Log stack trace for debugging
    });
    res.status(500).json({ message: 'Failed to retrieve submissions' });
  }
};

module.exports = {
  sendEmail,
  getMails,
};



