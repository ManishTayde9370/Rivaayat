const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'your-fallback-secret';
const cookieName = 'token';

const authMiddleware = {
  // ✅ Middleware to protect private routes
  requireAuth: (req, res, next) => {
    const token = req.cookies?.[cookieName];

    if (!token) {
      return res.status(401).json({ success: false, message: 'Unauthorized: Token missing' });
    }

    try {
      const decoded = jwt.verify(token, secret); // 🔐 Verifies JWT token
      req.user = decoded; // Attach decoded payload to request for downstream use
      next(); // Pass control to the next middleware
    } catch (error) {
      console.error("JWT verification failed:", error.message);
      return res.status(401).json({ success: false, message: 'Invalid or expired token' });
    }
  },

  // ✅ Optional middleware to attach user if token exists (but not required)
  optionalAuth: (req, res, next) => {
    const token = req.cookies?.[cookieName];

    if (!token) {
      return next(); // Token not required, proceed
    }

    try {
      const decoded = jwt.verify(token, secret);
      req.user = decoded; // Attach user if valid token
    } catch (error) {
      // Ignore token errors for optional auth
    }

    next(); // Continue regardless
  }
};

module.exports = authMiddleware;