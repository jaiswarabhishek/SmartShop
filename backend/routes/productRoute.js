const express = require('express');
const { getProducts,createProduct,updateProduct,deleteProduct,getProductById, searchProduct,getAllProductes,createOrUpdateReview,getAllReviews,deleteReview  } = require('../controller/productController');
const router = express.Router();
const {auth, authorizeRoles} = require('../middleware/auth')

// auth middleware is used to protect the route from unauthorized access 

// authorizeRoles check user is admin or not


router.route('/products').get(getProducts);
router.route('/products/new').post(auth,authorizeRoles("admin"), createProduct);
router.route('/products/:id').put(auth,authorizeRoles("admin"),updateProduct);
router.route('/products/:id').delete(auth,authorizeRoles("admin"),deleteProduct);
router.route('/products/:id').get(getProductById);
router.route('/products/search/:query').get(searchProduct)
router.route('/allproducts').get(getAllProductes)
router.route('/review').put(auth,createOrUpdateReview)
router.route('/review').get(getAllReviews)
router.route('/review').delete(auth,deleteReview)



module.exports = router;