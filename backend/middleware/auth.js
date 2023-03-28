const jwt = require('jsonwebtoken');

const User = require('../model/userModel')

// Middleware function to verify JWT token
const auth = async(req, res, next) => {
  // Get the token from the cookie
  const token = req.cookies.token;


  // If the token doesn't exist, return an error
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Verify the token using the JWT_SECRET environment variable
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Add the user ID to the request object
    req.userId = decoded.id;

    req.user = await User.findById(req.userId).select('-password');
    console.log(req.user);



    // Call the next middleware function
    next();
  } catch (err) {
    // If the token is invalid or has expired, return an error
    return res.status(401).json({ message: 'Token is not valid' });
  }
};

const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'You are not authorized to access this route' });
        }
        next();
    };
};


module.exports = { auth, authorizeRoles };
