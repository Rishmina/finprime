const express = require("express");
const emailController = require("../controllers/emailController");
const router = express.Router();

// POST route to handle form submission
router.post('/sendemail', emailController.SendEmail);

// GET route to retrieve all form submissions
router.get('/mails', emailController.GetMails);

module.exports = router;
