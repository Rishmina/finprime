const mysql = require('mysql2');

require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'blogUser2',
    password: process.env.DB_PASSWORD || 'fin@2025!',
    database: process.env.DB_NAME || 'blogApp',
    waitForConnections: true,
    connectionLimit: 10, // Adjust as needed
    queueLimit: 0,
});

pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Database connected!');
    connection.release(); // Release the connection back to the pool
});

console.log(pool ? 'Database pool initialized successfully.' : 'Database pool initialization failed.');


module.exports = pool; 
