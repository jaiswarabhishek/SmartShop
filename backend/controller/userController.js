const User = require('../model/userModel');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const jwt = require('jsonwebtoken');
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


// Function to get a single user by ID
exports.getUserById = async(req,res)=>{
    try{
          const user = await User.findById(req.params.id);
        if(!user)
        return res.status(400).json("User Not Found");

        res.status(200).json(user);

    }catch(err){
        console.log(err);
        res.status(500).json("Server Error");
    }
}