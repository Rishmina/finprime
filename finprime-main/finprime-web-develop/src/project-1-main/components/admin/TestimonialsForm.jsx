import React, { useState } from 'react';
import axios from 'axios';
import SideNavbar from '../adminregister/SideNavbar';

const TestimonialsForm = ({ fetchTestimonials }) => {
    const [formData, setFormData] = useState({
        topic: '',
        content: '',
        author_name: '',
        image: null,
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && !file.type.startsWith('image/')) {
            setError('Please upload a valid image file (JPEG, PNG, GIF).');
        } else {
            setFormData((prev) => ({
                ...prev,
                image: file, // Set the selected file
            }));
            setError(null); // Clear error if file is valid
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check required fields
        if (!formData.topic || !formData.content || !formData.author_name) {
            return setError('All fields are required.');
        }

        setLoading(true);
        setError(null); // Reset error state

        const form = new FormData();
        form.append('topic', formData.topic);
        form.append('content', formData.content);
        form.append('author_name', formData.author_name);
        if (formData.image) {
            form.append('image', formData.image);
        }

        try {
            const response = await axios.post(
                'https://finprimeconsulting.com/api/testimonials',
                form,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            
            if (response.status === 200) {
                alert('Testimonial uploaded successfully');
                if (fetchTestimonials) fetchTestimonials();
                // Reset form fields
                setFormData({ topic: '', content: '', author_name: '', image: null });
            } else {
                setError('Failed to upload testimonial. Please try again later.');
            }
        } catch (err) {
            console.error('Error details:', err);  // Log the full error object to understand it better

            let errorMessage = 'An unknown error occurred';

            if (err.response) {
                // Handle error response from the server
                console.error('Server error response:', err.response);
                errorMessage = err.response.data?.message || err.response.data?.error || 'Something went wrong on the server';
            } else if (err.request) {
                // Handle no response from the server
                console.error('No response received:', err.request);
                errorMessage = 'No response received from the server';
            } else {
                // Handle other errors
                console.error('Error setting up the request:', err.message);
                errorMessage = err.message || 'An unknown error occurred';
            }

            setError(`Error uploading testimonials: ${errorMessage}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='flex h-screen'>
            <SideNavbar />
            <div className="mx-auto mt-16 rounded-lg shadow-lg p-4 py-20 pr-10 pl-10 overflow-auto w-full">
                <h2 className="text-3xl font-semibold mb-6 text-center">Upload Testimonial</h2>
                <form onSubmit={handleSubmit} className='border border-black p-6'>
                    <div className="mb-4">
                        <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                            Testimonial Image
                        </label>
                        <input
                            type="file"
                            name="image"
                            onChange={handleFileChange}
                            className="w-full mt-1 p-3 border border-gray-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="author_name" className="block text-sm font-medium text-gray-700">
                            Author Name
                        </label>
                        <input
                            type="text"
                            name="author_name"
                            value={formData.author_name}
                            onChange={handleChange}
                            placeholder="Enter the author's name"
                            className="w-full mt-1 p-3 border border-gray-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="topic" className="block text-sm font-medium text-gray-700">
                            Topic
                        </label>
                        <input
                            type="text"
                            name="topic"
                            value={formData.topic}
                            onChange={handleChange}
                            placeholder="Enter the testimonial topic"
                            className="w-full mt-1 p-3 border border-gray-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                            Content
                        </label>
                        <textarea
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            placeholder="Enter the testimonial content"
                            rows="6"
                            className="w-full mt-1 p-3 border border-gray-500"
                            required
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-transparent border border-black text-black hover:text-white px-6 py-2 mx-5 mb-6 transition-all 
                                duration-300 ease-out hover:bg-gradient-to-r hover:from-brandBlue hover:to-cyan-500"
                        >
                            {loading ? 'Uploading...' : 'Upload Testimonial'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TestimonialsForm;
