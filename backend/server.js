const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./src/routes/authRoutes');

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRoutes);

app.listen(5000, (error) => {
    if (error) {
        console.error('Error starting server:', error);
    } else {
        console.log('Server is running on port 5000');
    }
});
