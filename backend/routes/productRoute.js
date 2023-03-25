const express = require('express');
const { getAllProductes } = require('../controller/productController');
const router = express.Router();

router.route('/products').get(getAllProductes);



module.exports = router;