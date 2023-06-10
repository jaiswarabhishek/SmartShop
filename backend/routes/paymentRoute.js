const express = require('express');
const router = express.Router();
const {auth} = require('../middleware/auth')
const {processPayment,sendStripeApiKey} = require('../controller/PaymentController')

router.route('/payment/process').post(auth,processPayment)
router.route('/stripeapi').get(auth,sendStripeApiKey)

module.exports = router;