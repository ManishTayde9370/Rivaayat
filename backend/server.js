require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// ✅ Route imports
const authRoutes = require('./src/routes/authRoutes');
const linksRoutes = require('./src/routes/linksRoutes'); // ✅ Affiliate links

const app = express();

// ✅ CORS Configuration
app.use(
  cors({
    origin: process.env.CLIENT_ENDPOINT || 'http://localhost:3000',
    credentials: true,
  })
);

// ✅ Middleware for parsing JSON and cookies
app.use(express.json());
app.use(cookieParser());

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI || 'mongodb://localhost:27017/rivaayat', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// ✅ Register API Routes
app.use('/api/auth', authRoutes);
app.use('/api/links', linksRoutes); // ✅ Affiliate Links API

// ✅ Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at: http://localhost:${PORT}`);
});
