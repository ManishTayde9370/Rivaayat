const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'your-fallback-secret';
const cookieName = 'token';

const getTokenFromRequest = (req) => req.cookies?.[cookieName];

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, secret);

    if (!decoded || !decoded._id) {
      throw new Error('Invalid token payload');
    }

    return decoded;
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};

const authMiddleware = {
  // ✅ Require authenticated user
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

  // ✅ Require admin user
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

  // ✅ Optional: Attach user if token valid
  optionalAuth: (req, res, next) => {
    const token = getTokenFromRequest(req);
    if (token) {
      try {
        req.user = verifyToken(token);
      } catch (error) {
        // ignore if token is invalid
      }
    }
    next();
  },

  // ✅ General token verifier
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