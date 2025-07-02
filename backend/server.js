require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./src/routes/authRoutes');         // 👤 Public/Auth/User
const adminRoutes = require('./src/routes/adminRoutes');       // 🔐 Admin-protected routes
const adminProductRoutes = require('./src/routes/adminProductRoutes'); // 📦 Product CRUD
const publicProductRoutes = require('./src/routes/publicProductRoutes');


const app = express();

// ✅ Enable CORS for frontend
app.use(
  cors({
    origin: process.env.CLIENT_ENDPOINT || 'http://localhost:3000',
    credentials: true,
  })
);

// ✅ Parse incoming requests
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

// ✅ Serve uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ API Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/admin/products', adminProductRoutes); // ➕ Products CRUD
// ✅ Public Product Routes (no auth needed)
app.use('/api/products', publicProductRoutes);


// ✅ Root
app.get('/', (req, res) => {
  res.send('🌿 Rivaayat Server is running');
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at: http://localhost:${PORT}`);
});
