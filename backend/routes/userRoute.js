const express = require('express');
const router = express.Router();
const {createNewUser, getUserById,loginUser,logout} = require('../controller/userController')


router.route('/signup').post(createNewUser);
router.route('/user/:id').get(getUserById);
router.route('/login').post(loginUser);
router.route('/logout').get(logout);

module.exports = router;