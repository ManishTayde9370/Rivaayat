const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./src/routes/authRoutes');
const cors = require('cors');

const app = express();


const corsOptions = {
    origin: 'http://localhost:3000', 
    credentials: true                 
};
app.use(cors(corsOptions));

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/auth', authRoutes);

// Start server
app.listen(5000, (error) => {
    if (error) {
        console.error('Error starting server:', error);
    } else {
        console.log('Server is running on port 5000');
    }
});
