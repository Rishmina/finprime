
const db = require('../config/db'); // Import the DB connection

// Function to upload a new 
const uploadTestimonials = async (req, res) => {
    try {
        const { topic, content, author_name } = req.body;
        const image_path = req.file ? req.file.path : null; // Optional image field

        const query = `
            INSERT INTO testimonials (topic, content, author_name, image_path)
            VALUES (?, ?, ?, ?)
        `;
        
        const [results] = await db.promise().execute(query, [topic, content, author_name, image_path]);

        res.status(201).json({ message: 'Testimonials uploaded successfully', testimonialsId: results.insertId });
    } catch (err) {
        console.error('Error uploading Testimonials:', err);
        res.status(500).json({ message: 'Error uploading Testimonials' });
    }
};

// Get a single testimonial by ID
const getTestimonialById = async (req, res) => {
    const { testimonialsId } = req.params;
    try {
        const query = 'SELECT * FROM testimonials WHERE id = ?';
        const [result] = await db.promise().query(query, [testimonialsId]);

        if (result.length === 0) {
            return res.status(404).json({ message: 'Testimonial not found' });
        }

        // Adjusting image path if it exists
        if (result[0].image_path) {
            result[0].image_path = `${process.env.BASE_URL || 'https://finprimeconsulting.com'}/${result[0].image_path}`;
        }

        res.status(200).json(result[0]);
    } catch (err) {
        console.error('Error fetching testimonial by ID:', err);
        res.status(500).json({ message: 'Error fetching testimonial', error: err.message });
    }
};


// Function to update an existing testimonial
const updateTestimonial = async (req, res) => {
    const { testimonialsId } = req.params;
    const { topic, content, author_name } = req.body;
    let image_path = req.file ? req.file.path : null; // Optional image field

    try {
        // If no new image is uploaded, don't overwrite the existing image_path
        if (!image_path) {
            const [existingTestimonial] = await db.promise().query('SELECT image_path FROM testimonials WHERE id = ?', [testimonialsId]);
            if (existingTestimonial.length > 0) {
                image_path = existingTestimonial[0].image_path; // Retain existing image
            } else {
                return res.status(404).json({ message: 'Testimonial not found' });
            }
        }

        const query = `
            UPDATE testimonials
            SET topic = ?, content = ?, author_name = ?, image_path = ?
            WHERE id = ?
        `;

        const [result] = await db.promise().execute(query, [topic, content, author_name, image_path, testimonialsId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Testimonial not found' });
        }

        res.status(200).json({ message: 'Testimonial updated successfully' });
    } catch (err) {
        console.error('Error updating testimonial:', err);
        res.status(500).json({ message: 'Error updating testimonial', error: err.message });
    }
};


// Function to delete a testimonial
const deleteTestimonial = async (req, res) => {
    const { testimonialsId } = req.params;

    try {
        const query = 'DELETE FROM testimonials WHERE id = ?';
        const [result] = await db.promise().execute(query, [testimonialsId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Testimonial not found' });
        }

        res.status(200).json({ message: 'Testimonial deleted successfully' });
    } catch (err) {
        console.error('Error deleting testimonial:', err);
        res.status(500).json({ message: 'Error deleting testimonial' });
    }
};




// Function to get all 
const getTestimonials = async (req, res) => {
    try {
        const query = 'SELECT * FROM testimonials ORDER BY created_at DESC';
        const [results] = await db.promise().query(query);
        
        res.status(200).json(results);
    } catch (err) {
        console.error('Error fetching testimonials:', err);
        res.status(500).json({ message: 'Error fetching testimonials' });
    }
};

module.exports = { uploadTestimonials, getTestimonials, getTestimonialById , updateTestimonial , deleteTestimonial };
