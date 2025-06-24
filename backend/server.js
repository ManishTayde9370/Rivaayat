require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const authRoutes = require('./src/routes/authRoutes');

const app = express();



// ✅ CORS middleware (Place here!)
app.use(cors({
  origin: process.env.CLIENT_ENDPOINT || 'http://localhost:3000',
  credentials: true
}));

// ✅ Then body parser and cookies
app.use(express.json());
app.use(cookieParser());

// ✅ Connect MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected successfully'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// ✅ Define Routes
app.use('/api/auth', authRoutes); 

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
