const jwt = require('jsonwebtoken');

// Function to generate a JWT token and store it in a cookie with an expiration time
const generateTokenAndSetCookie = (res, user) => {
  // Generate a JWT token with the user ID and expiration time of two days (172800 seconds)
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '2d' });

  // Set the token in a cookie with the same name as the JWT token
  res.cookie("token", token, {
    // experies in 2 days
    expires: new Date(Date.now() +  172800000),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  }).json({success:true,token,user})

    // Send the token in the response body
  
};

module.exports = generateTokenAndSetCookie;
