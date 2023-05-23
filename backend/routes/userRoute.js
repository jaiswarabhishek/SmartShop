const express = require('express');
const router = express.Router();
const {createNewUser, getUserDetails,loginUser,logout,forgotPassword,updateUserProfile,getAllUsers,getUserById,updateUserRole} = require('../controller/userController')
const {auth,authorizeRoles} = require('../middleware/auth');


router.route('/signup').post(createNewUser);
router.route('/user').get(auth,getUserDetails);
router.route('/login').post(loginUser);
router.route('/logout').get(auth,logout);
router.route('/password/forgot').post(forgotPassword);
router.route('/user/update').put(auth,updateUserProfile);
router.route('/admin/users').get(auth,authorizeRoles("admin"),getAllUsers);
router.route('/admin/users/:id').get(auth,authorizeRoles("admin"),getUserById);
router.route('/admin/users/:id').put(auth,authorizeRoles("admin"),updateUserRole);



module.exports = router;