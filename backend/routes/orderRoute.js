const express = require('express');
const router = express.Router();
const {auth,authorizeRoles} = require('../middleware/auth');
const {newOrder,getSingleOrder,myOrders,deleteOrder,updateOrder,allOrders } = require('../controller/orderController')


router.route("/order/new").post(auth,newOrder)
router.route("/order/:id").get(auth,getSingleOrder)
router.route("/orders/me").get(auth,myOrders)
router.route("/admin/orders").get(auth,authorizeRoles("admin"),allOrders)
router.route("/admin/order/:id").put(auth,authorizeRoles("admin"),updateOrder)
router.route("/admin/order/:id").delete(auth,authorizeRoles("admin"),deleteOrder)



module.exports = router;





