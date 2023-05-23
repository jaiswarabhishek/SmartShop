const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  shippingInfo: {
    address: {
      type: String,
      required: [true, "Please enter shipping address"]
    },
    city: {
      type: String,
      required: [true, "Please enter city"]
    },
    phoneNo: {
      type: Number,
      required: [true, "Please enter phone number"]
    },
    postalCode: {
      type: Number,
      required: [true, "Please enter postal code"]
    },
    country: {
      type: String,
      required: [true, "Please enter country"]
    },
  },
  user: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'User'
  },
  orderItems: [
    {
      name: {
        type: String,
        required: true
      },
      quantity: {
        type: Number,
        required: true
      },
      image: {
        type: String, //image url
        required: true
       
      },
      price: {
        type: Number,
        required: true
      },
      product: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'Product'
      },
    }
  ],
  paymentInfo: {
    id: {
      type: String
    },
    status: {
      type: String
    }
  },
  paidAt: {
    type: Date
  },
  itemsPrice: {
    type: Number,
    required: true,
    default: 0.0
  },
  taxPrice: {
    type: Number,
    required: true,
    default: 0.0
  },
  shippingPrice: {
    type: Number,
    required: true,
    default: 0.0
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0.0
  },

  orderStatus: {
    type: String,
    required: true,
    default: 'Processing'
  },
  deliveredAt: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  }

})


module.exports = mongoose.model('Order', orderSchema);