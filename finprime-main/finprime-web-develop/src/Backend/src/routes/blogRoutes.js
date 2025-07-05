// blogRoutes.js
const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');  
const blogController = require('../controllers/blogController');

// Route to upload a blog
router.post('/', upload.single('image'), blogController.uploadBlog);

// Route to get all blogs
router.get('/', blogController.getBlogs);

router.get('/:blogId', blogController.getBlogById);

// Route to update a blog
router.put('/:blogId', upload.single('image'), blogController.updateBlog);

// Route to delete a blog
router.delete('/:blogId', blogController.deleteBlog);

module.exports = router;
