const jwt = require('jsonwebtoken');

// Function to generate a JWT token and store it in a cookie with an expiration time
const generateTokenAndSetCookie = (res, userId) => {
  // Generate a JWT token with the user ID and expiration time of two days (172800 seconds)
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '2d' });

  // Set the token in a cookie with the same name as the JWT token
  res.cookie('token', token, {
    expires: new Date(Date.now() + 172800000),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  });

    // Send the token in the response body
    res.status(200).json(token);
};

module.exports = generateTokenAndSetCookie;
