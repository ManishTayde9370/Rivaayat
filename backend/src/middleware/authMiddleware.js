const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'your-fallback-secret';
const cookieName = 'token';

const authMiddleware = {
  // ✅ Middleware: Require any authenticated user
  requireAuth: (req, res, next) => {
    const token = req.cookies?.[cookieName];

    if (!token) {
      return res.status(401).json({ success: false, message: 'Unauthorized: Token missing' });
    }

    try {
      const decoded = jwt.verify(token, secret);
      req.user = decoded;
      next();
    } catch (error) {
      console.error('JWT verification failed:', error.message);
      return res.status(401).json({ success: false, message: 'Invalid or expired token' });
    }
  },

  // ✅ Middleware: Require admin user only
  requireAdmin: (req, res, next) => {
    const token = req.cookies?.[cookieName];

    if (!token) {
      return res.status(401).json({ success: false, message: 'Unauthorized: Token missing' });
    }

    try {
      const decoded = jwt.verify(token, secret);

      if (!decoded.isAdmin) {
        return res.status(403).json({ success: false, message: 'Access denied: Admins only' });
      }

      req.user = decoded;
      next();
    } catch (error) {
      console.error('JWT verification failed:', error.message);
      return res.status(401).json({ success: false, message: 'Invalid or expired token' });
    }
  },

  // ✅ Middleware: Optional auth attach (non-blocking)
  optionalAuth: (req, res, next) => {
    const token = req.cookies?.[cookieName];

    if (token) {
      try {
        const decoded = jwt.verify(token, secret);
        req.user = decoded;
      } catch (error) {
        // Don't block route, just ignore invalid token
      }
    }

    next();
  }
};

module.exports = authMiddleware;
