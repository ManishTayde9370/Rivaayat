const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'your-fallback-secret';
const cookieName = 'token';

// Utility: Extract token from cookies
const getTokenFromRequest = (req) => req.cookies?.[cookieName];

// Utility: Verify and decode token
const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, secret);

    if (!decoded || !decoded._id) {
      throw new Error('Invalid token payload');
    }

    return decoded;
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      throw new Error('Session expired. Please log in again.');
    } else {
      throw new Error('Invalid or corrupted token');
    }
  }
};

// Middleware collection
const authMiddleware = {
  // ✅ Authenticated users only
  requireAuth: (req, res, next) => {
    const token = getTokenFromRequest(req);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. Please log in.',
      });
    }

    try {
      const user = verifyToken(token);
      req.user = user;
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: error.message,
      });
    }
  },

  // ✅ Admins only
  requireAdmin: (req, res, next) => {
    const token = getTokenFromRequest(req);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. Please log in as admin.',
      });
    }

    try {
      const user = verifyToken(token);
      if (!user.isAdmin) {
        return res.status(403).json({
          success: false,
          message: 'Access denied. Admin privileges required.',
        });
      }

      req.user = user;
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: error.message,
      });
    }
  },

  // ✅ Attach user if token exists (optional)
  optionalAuth: (req, res, next) => {
    const token = getTokenFromRequest(req);

    if (token) {
      try {
        req.user = verifyToken(token);
      } catch (error) {
        // Token invalid, ignore silently
        req.user = null;
      }
    }

    next();
  },

  // ✅ Strict verifier with 403 for invalid token
  verifyToken: (req, res, next) => {
    const token = getTokenFromRequest(req);

    if (!token) {
      return res.status(401).json({
        message: 'Authentication required.',
      });
    }

    try {
      req.user = verifyToken(token);
      next();
    } catch (error) {
      return res.status(403).json({
        message: error.message,
      });
    }
  },
};

module.exports = authMiddleware;
