const Order = require('../model/orderModel')
const Product = require('../model/productModel')



// create a new order 
exports.newOrder = async (req, res, next) => {

 try {

    const { orderItems, shippingInfo, itemsPrice, taxPrice, shippingPrice, totalPrice, paymentInfo } = req.body;

    const order = await Order.create({
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt: Date.now(),
        user: req.user._id
    })

    res.status(200).json({
        success: true,
        order
    })



 }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server error' });
    }


}

// Get single order
exports.getSingleOrder = async (req, res, next) => {

    try {
        const order = await Order.findById(req.params.id).populate('user', 'name email')// populate the user field with name and email fields from the user Schema or Collection

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.status(200).json({
            success: true,
            order
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server error' });
    }

}

// Get logged in user orders

exports.myOrders = async (req, res, next) => {

         try{
                const orders = await Order.find({ user: req.user.id })

                if (!orders) {
                    return res.status(404).json({ error: 'Order not found' });
                }

                res.status(200).json({
                    success: true,
                    orders
                })



            
         }
         catch(error){
             console.log(error);
             res.status(500).json({ error: 'Server error' });
         }
}


// Get all orders - ADMIN

exports.allOrders = async (req, res, next) => {

    try{
           const orders = await Order.find()

           let totalAmount = 0;

           orders.forEach(order => {
               totalAmount += order.totalPrice
           })

              res.status(200).json({
                    success: true,
                    totalAmount,
                    orders
                })

            }
            catch(error){
                console.log(error);
                res.status(500).json({ error: 'Server error' });
            }
    }


// Update / Process order - ADMIN

exports.updateOrder = async (req, res, next) => {

    try{
           const order = await Order.findById(req.params.id)

           if(order.orderStatus === 'Delivered'){
               return res.status(400).json({ error: 'You have already delivered this order' });
           }

              order.orderItems.forEach(async item => {
                    await updateStock(item.product, item.quantity)
                })  

           order.orderStatus = req.body.status

          if(req.body.status === 'Delivered')
           order.deliveredAt = Date.now()

           await order.save()

              res.status(200).json({
                    success: true,
                })

            }
            catch(error){
                console.log(error);
                res.status(500).json({ error: 'Server error' });
            }
    }


async function updateStock(id, stock){

    const product = await Product.findById(id)

    if(!product){
        return res.status(404).json({ error: 'Product not found' });
    }
console.log("stock Value : "+ stock)
    product.quantity-= stock

    await product.save({ validateBeforeSave: false })
}


// Delete order - ADMIN
exports.deleteOrder = async (req, res, next) => {

    try{
         
   const deletedOrder = await Order.findOneAndDelete({ _id: req.params.id });

    if (!deletedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }

      res.status(200).json({ message: 'Order deleted successfully' });


   }
            catch(error){
                console.log(error);
                res.status(500).json({ error: 'Server error' });
            }
    }

