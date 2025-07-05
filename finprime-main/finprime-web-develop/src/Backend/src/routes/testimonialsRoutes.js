// blogRoutes.js
const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');  // Import the multer upload middleware
const testimonialsController = require('../controllers/testimonialsController');

// Route to upload a blog
router.post('/', upload.single('image'), testimonialsController.uploadTestimonials);

// Route to get all blogs
router.get('/', testimonialsController.getTestimonials);

// Route to get a single blog by ID (for editing)
router.get('/:testimonialsId', testimonialsController.getTestimonialById);

// Route to update a blog
router.put('/:testimonialsId', upload.single('image'), testimonialsController.updateTestimonial);

// Route to delete a blog
router.delete('/:testimonialsId', testimonialsController.deleteTestimonial);

module.exports = router;