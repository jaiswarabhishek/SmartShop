const User = require('../model/userModel');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const sendEmail = require('../utils/senEmail')
const generateTokenAndSetCookie = require('../utils/jwtToken');
const userPng =
  "https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"; //default profile pic for the user


// Create New user or Signup
exports.createNewUser= async(req,res)=>{
   const { name, email, password,avatar } = req.body;
   
   // Validate name,email & password
   if(!name || !email || !password)
   {
    return res.status(400).json({error:"Please fill all the inputs..."});
   }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: 'Please provide a valid email address.' });
  }

  if(password.length < 8)
  return res.status(400).json({error: "Password Should be 8 character long"});

  try{
    // check if user already exist
    const existingUser = await User.findOne({ email });

    if(existingUser)
    return res.status(400).json({error:"Account already exist"})

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create New User 
   const user = new User({ name, email:email.toLowerCase(), password: hashedPassword,avatar:{
    public_id:"PUBLIC ID",
    url:userPng
   } });

    await user.save();



    // Generate a JWT token and store it in a cookie with a two-day expiration time
  generateTokenAndSetCookie(res, user._id);

  }
  catch(err){
   console.log(err);
   res.status(500).json("Server error")
  }
}



// Login User 
exports.loginUser = async(req,res)=>{
    const { email, password } = req.body;

    // Validate email & password
    if(!email || !password)
    {
      return res.status(400).json({error:"Please fill all the inputs..."});
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: 'Please provide a valid email address.' });
    }

    try{

      // Find the user with the given email
    const user = await User.findOne({ email }).select("+password");

    if(!user)
    return res.status(400).json({error:"Invalid credentials"})

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch)
    return res.status(400).json({error:"Invalid Password"})

     // Generate a JWT token and store it in a cookie with a two-day expiration time
  generateTokenAndSetCookie(res, user._id);


    }

    catch(err){
     console.log(err);
      res.status(500).json("Server error")
    }
  }

// Logout
exports.logout = (req, res) => {
  // Clear the token cookie by setting its value to an empty string and an expiration date in the past
  res.cookie('token', '', { expires: new Date(0) });

  // Send a success response
  res.status(200).json({ message: 'Logout successful' });
};

// Forgot Password

exports.forgotPassword = async (req, res, next) => {
  // Get the user's email from the request body
  const { email } = req.body;

  try {
    // Find the user in the database
    const user = await User.findOne({ email });

    // If the user doesn't exist, return an error
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Generate a reset token and save it to the user's account
    const token = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // Expires in 1 hour
    await user.save();

    // Send an email to the user with the reset link
    const resetUrl = `${req.protocol}://${req.get(
      'host'
    )}/api/v1/password/reset/${token}`;

    const message = `You are receiving this email because you  have requested the reset of the password for your account.\n\nPlease click on the following link, or paste this into your browser to complete the process:\n\n${resetUrl}\n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n`;

    try {
      await sendEmail({
        email: user.email,
        subject: 'Password Reset',
        message,
      });

      res.status(200).json({ success: true, data: 'Email sent' });
    } catch (err) {
      console.log(err);
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;

      await user.save();

      return res.status(500).json({ error: 'Email could not be sent' });
    }

    res.status(200).json({ success: true, data: user });



  } catch (err) {
    next(err);
  }
};


// Function to get a single user by ID
exports.getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password'); // select all user fields except the password field
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};


// Update User Profile 

exports.updateUserProfile = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findById(req.user._id).select('+password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await user.save();

    return res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};



// Get all users
exports.getAllUsers = async (req, res) => {

  try {
    const users = await User.find();

    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {

  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}


// Update User role

exports.updateUserRole = async (req, res) => {

  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.role = req.body.role;

    await user.save();

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}

    


