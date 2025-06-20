// blogController.js
const db = require('../config/db'); // Import the DB connection
const slugify = require('slugify');
const validator = require('validator');

// Function to upload a new blog
const uploadBlog = async (req, res) => {
    try {
        const { topic, content, author_name, services, subservices } = req.body;
        const image_path = req.file ? req.file.path : null;

        // Generate base slug
        const baseSlug = slugify(topic, {
            lower: true,
            strict: true,
            trim: true
        });

        let newSlug = baseSlug;
        let counter = 1;

        while (true) {
        const [existing] = await db.promise().query(
            'SELECT id FROM blogs WHERE blog_slug = ?',
            [newSlug]
        );

        if (existing.length === 0) break;
        newSlug = `${baseSlug}-${counter++}`;
        }

        const query = `
        INSERT INTO blogs 
        (topic, content, author_name, image_path, services, subservices, blog_slug)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        const [results] = await db.promise().execute(query, [
        topic, 
        content, 
        author_name, 
        image_path, 
        services, 
        subservices,
        newSlug
        ]);

        res.status(201).json({ message: 'Blog uploaded successfully', blogId: results.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error uploading blog' });
    }
  };

// Function to get all blogs
const getBlogs = async (req, res) => {
    try {
        const query = 'SELECT * FROM blogs ORDER BY created_at DESC';
        const [results] = await db.promise().query(query);

        res.status(200).json(results);
    } catch (err) {
        console.error('Error fetching blogs:', err);
        res.status(500).json({ message: 'Error fetching blogs' });
    }
};


// Get a single blog by ID
const getBlogById = async (req, res) => {
    const { blogId } = req.params;
    try {
        let query;
        let params;
        
        // Use validator's isInt check with strict options
        const isNumericId = validator.isInt(blogId, { 
            allow_leading_zeroes: false, 
            min: 1 
        });

        if (isNumericId) {
            query = 'SELECT * FROM blogs WHERE id = ?';
            params = [parseInt(blogId, 10)];
        } else {
            query = 'SELECT * FROM blogs WHERE blog_slug = ?';
            params = [blogId];
        }

        const [result] = await db.promise().query(query, params);

        if (result.length === 0) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        // Adjusting image path if it exists
        if (result[0].image_path) {
            result[0].image_path = `${process.env.BASE_URL || 'https://finprimeconsulting.com'}/${result[0].image_path}`;
        }

        res.status(200).json(result[0]);
    } catch (err) {
        console.error('Error fetching blog:', err);
        res.status(500).json({ 
            message: 'Error fetching blog', 
            error: err.message 
        });
    }
};

// Function to update an existing blog
const updateBlog = async (req, res) => {
    const { blogId } = req.params;
    const { topic, content, author_name, services, subservices } = req.body;
    let image_path = req.file ? req.file.path : null;
  
    try {
        // Get existing blog data
        const [existingBlog] = await db.promise().query(
        'SELECT topic, image_path, blog_slug FROM blogs WHERE id = ?',
        [blogId]
        );

        if (existingBlog.length === 0) {
        return res.status(404).json({ message: 'Blog not found' });
        }

        // Retain existing image if not updated
        image_path = image_path || existingBlog[0].image_path;

        let newSlug = existingBlog[0].blog_slug;
        console.log(topic !== existingBlog[0].topic);
        
        // Generate new slug only if topic changed
        console.log(topic, existingBlog[0].topic);
        if (topic && topic !== existingBlog[0].topic) {
        const baseSlug = slugify(topic, {
            lower: true,
            strict: true,
            trim: true
            });

        let counter = 1;
        newSlug = baseSlug;

        while (true) {
            const [existing] = await db.promise().query(
            'SELECT id FROM blogs WHERE blog_slug = ? AND id != ?',
            [newSlug, blogId]
            );

            if (existing.length === 0) break;
            newSlug = `${baseSlug}-${counter++}`;
        }
        }

        const query = `
        UPDATE blogs
        SET 
            topic = ?, 
            content = ?, 
            author_name = ?, 
            services = ?, 
            subservices = ?, 
            image_path = ?,
            blog_slug = ?
        WHERE id = ?
        `;

        const [result] = await db.promise().execute(query, [
        topic || existingBlog[0].topic,
        content || existingBlog[0].content,
        author_name || existingBlog[0].author_name,
        services || existingBlog[0].services,
        subservices || existingBlog[0].subservices,
        image_path,
        newSlug,
        blogId
        ]);

        if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Blog not found' });
        }

        res.status(200).json({ message: 'Blog updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating blog' });
    }
  };



// Function to delete a blog
const deleteBlog = async (req, res) => {
    const { blogId } = req.params;

    try {
        const query = 'DELETE FROM blogs WHERE id = ?';
        const [result] = await db.promise().execute(query, [blogId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        res.status(200).json({ message: 'Blog deleted successfully' });
    } catch (err) {
        console.error('Error deleting blog:', err);
        res.status(500).json({ message: 'Error deleting blog' });
    }
};

module.exports = { uploadBlog, getBlogs, getBlogById, updateBlog, deleteBlog };
