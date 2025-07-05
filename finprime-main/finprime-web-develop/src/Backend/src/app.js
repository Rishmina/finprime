// app.js
require('dotenv').config(); 
const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');  
const morgan = require('morgan'); 
const helmet = require('helmet'); 
const blogRoutes = require('./routes/blogRoutes'); 
const testimonialsRoutes = require('./routes/testimonialsRoutes');  
const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const formRoutes = require('./routes/formRoutes');
const form2Routes = require('./routes/form2Routes');
const sidenavbarRoutes = require("./routes/sidenavbarRoutes");  
const emailRoutes = require("./routes/emailRoutes");
const email2Routes = require("./routes/email2Routes");
const app = express();


app.use(cors());  
app.use(bodyParser.json());
app.use(morgan('dev'));  
app.use(express.json());  
app.use(express.urlencoded({ extended: true }));  
app.use('/uploads', express.static('uploads')); 
app.use(helmet());

// Blog Routes
app.use('/api/blogs', blogRoutes);
app.use('/api/testimonials', testimonialsRoutes);
app.use("/api/auth", authRoutes);
app.use("/dashboard", dashboardRoutes);
app.use('/api', formRoutes); 
app.use('/api', form2Routes); 
app.use("/api", sidenavbarRoutes);
app.use("/api", emailRoutes);
app.use("/api", email2Routes);

// Start the server
const PORT = process.env.PORT || 5002;
const server = app.listen(PORT, () => {
  console.log(`Server running on https://finprimeconsulting.com`);
}).on('error', (err) => {
  console.error('Error starting server:', err);
  process.exit(1);
});

module.exports = app;  