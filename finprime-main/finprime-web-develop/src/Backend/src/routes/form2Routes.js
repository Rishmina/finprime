const express = require('express');
const router = express.Router();
const formController = require('../controllers/form2Controller');

// Route to get all form submissions
router.get('/form2-submissions', formController.getFormSubmissions);

// Route to submit a form
router.post('/submit-form2', formController.submitForm);

module.exports = router;
