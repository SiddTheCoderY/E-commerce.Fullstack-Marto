const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Assume you have a User model

// Authenticate user
const authenticate = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'Access Denied: No Token' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password'); // add user to req
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid Token' });
  }
};

// Authorize role(s)
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: `Access Denied: ${req.user.role} cannot access this` });
    }
    next();
  };
};

module.exports = { authenticate, authorizeRoles };
