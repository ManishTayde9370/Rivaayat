const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'your-fallback-secret';
const cookieName = 'token';

const getTokenFromRequest = (req) => req.cookies?.[cookieName];

const verifyToken = (token) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};

const authMiddleware = {
  requireAuth: (req, res, next) => {
    const token = getTokenFromRequest(req);
    if (!token) {
      return res.status(401).json({ success: false, message: 'Unauthorized: Token missing' });
    }

    try {
      req.user = verifyToken(token);
      next();
    } catch (error) {
      return res.status(401).json({ success: false, message: error.message });
    }
  },

  requireAdmin: (req, res, next) => {
    const token = getTokenFromRequest(req);
    if (!token) {
      return res.status(401).json({ success: false, message: 'Unauthorized: Token missing' });
    }

    try {
      const decoded = verifyToken(token);
      if (!decoded.isAdmin) {
        return res.status(403).json({ success: false, message: 'Access denied: Admins only' });
      }
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ success: false, message: error.message });
    }
  },

  optionalAuth: (req, res, next) => {
    const token = getTokenFromRequest(req);
    if (token) {
      try {
        req.user = verifyToken(token);
      } catch (error) {
        // Do nothing on error, it's optional
      }
    }
    next();
  },

  verifyToken: (req, res, next) => {
    const token = getTokenFromRequest(req);
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: Token missing' });
    }

    try {
      req.user = verifyToken(token);
      next();
    } catch (error) {
      return res.status(403).json({ message: error.message });
    }
  },
};

module.exports = authMiddleware;
