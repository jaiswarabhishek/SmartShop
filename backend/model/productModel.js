const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true,"Please enter product name"],
    trim: true
  },
  description: {
    type: String,
    required: [true,"Please enter product description"],
    trim: true
  },
  category: {
    type: String,
    required: [true,"Please Enter Product Category"],
    trim: true
  },
  brand: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    trim: true
  },
  ratings:{
   type:Number,
    default:0
  },
  quantity: {
    type: Number,
    required: true,
    trim: true
  },


  images: [{

    public_id:{
     type:String,
   required:true
    },
    url:{
 type:String,
 required:true
    }
  
  }],

  numOfReviews:{
    type:Number,
    default:0
  },

  reviews:[
    {
        user:{
            type:mongoose.Schema.ObjectId,
            ref:'User',
            required:true
        },
        name:{
            type:String,
            required:true
        },
        rating:{
            type:String,
            required:true
        },
        comment:{
            type:String,
            required:true
        }
    }

  ],
  createdAt:{
    type:Date,
    default:Date.now
  }
  
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
