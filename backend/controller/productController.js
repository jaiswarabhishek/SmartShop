const Product = require('../model/productModel')

// Create Product Admin
exports.createProduct = async (req, res ) => {
  const { name, description, category, brand, price, quantity, images } = req.body;

  try {
    const product = new Product({
      name,
      description,
      category,
      brand,
      price,
      quantity,
      images

    });

    await product.save();

    res.status(201).json({ message: 'Product created successfully', product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};




//Update Products Admin
exports.updateProduct = async (req, res) => {
  const { name, description, category, brand, price, quantity, images,rating } = req.body;
  const productId = req.params.id;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.name = name || product.name;
    product.description = description || product.description;
    product.category = category || product.category;
    product.brand = brand || product.brand;
    product.price = price || product.price;
    product.quantity = quantity || product.quantity;
    product.images = images || product.images;
    product.rating = rating || product.rating;
   

    const updatedProduct = await product.save();

    res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};




// Delete Product Admin
exports.deleteProduct = async (req, res) => {
  const productId = req.params.id;

  try {
    const result = await Product.deleteOne({ _id: productId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};




// Get Single Product
exports.getProductById = async (req, res) => {
  const productId = req.params.id;


  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};





// Get all products
exports.getAllProductes= async(req,res)=>{
    try{
        const products = await Product.find();
        
        res.status(200).json(products)

    }
    catch(err){
         console.error(error);
       res.status(500).json({ message: 'Internal server error' });
    }
}



// Search Product
exports.searchProduct = async (req, res) => {
  try {
    const query = req.params.query;
      if (query.length === 0) return;
    const products = await Product.find( {name: { $regex: query, $options: "i" }});
    res.status(200).json(products);
  } catch (error) {
     console.error(error);
       res.status(500).json({ message: 'Internal server error' });
  }
};



// Pagination & Filter Functionality
exports.getProducts = async (req, res, next) => {
 
  try {
    const { page = 1, limit = 8, category, priceMin, priceMax, ratingMin, ratingMax } = req.query;

    // Build query object based on request parameters
    const query = {};
    if (category) {
      query.category = category;
    }
    if (priceMin || priceMax) {
      query.price = {};
      if (priceMin) {
        query.price.$gte = priceMin;
      }
      if (priceMax) {
        query.price.$lte = priceMax;
      }
    }
    if (ratingMin || ratingMax) {
      query.rating = {};
      if (ratingMin) {
        query.rating.$gte = ratingMin;
      }
      if (ratingMax) {
        query.rating.$lte = ratingMax;
      }
    }

    // Calculate total number of matching products
    const totalProducts = await Product.countDocuments(query);

    // Apply pagination
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const results = await Product.find(query).sort({ price: 'asc' }).limit(limit).skip(startIndex);

    // Return paginated results and total number of products
    res.status(200).json({
      results,
      totalPages: Math.ceil(totalProducts / limit),
      currentPage: page,
      totalResults: totalProducts
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
   
  }
};



// Create New Review or Update Existing Review
exports.createOrUpdateReview = async (req, res) => {
  try {
   
    const userId = req.user._id;
    const { rating, comment, productId } = req.body;
    console.log(rating + " " + comment + " " + productId + " " + userId)

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if the user has already reviewed the product
    const existingReview = product.reviews.find(
      (r) => r.user.toString() === userId.toString()
    );

    if (existingReview) {
      // Update existing review
      existingReview.rating = rating;
      existingReview.comment = comment;
    } else {
      // Create new review
      const review = {
        user: userId,
        name: req.user.name,
        rating: rating,
        comment: comment,
      };
      product.reviews.push(review);
    }

     product.numOfReviews = product.reviews.length;

    // Recalculate product rating
    const totalReviews = product.reviews.length;
    const totalRating = product.reviews.reduce(
      (acc, item) => Number(item.rating) + acc,
      0
    );
    console.log(totalRating + " " + totalReviews)

   
    product.ratings = totalRating / totalReviews;

    // Save product and return updated review information
    const updatedProduct = await product.save();

    res.status(201).json({
      message: "Review added/updated successfully",
      review: updatedProduct.reviews.find(
        (r) => r.user.toString() === userId.toString()
      ),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


// Get All Reviews

exports.getAllReviews = async (req, res) => {
 console.log(req.query.productId)
  try {
    const productId = req.params.id;
    
    const products = await Product.find({ _id:req.query.productId });
    console.log(products)

    if (!products) {
      return res.status(404).json({ message: "Product not found" });
    }
    


    res.status(200).json(products[0].reviews);

  }
  catch(error)
  {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}



// Delete Review There is bug in this function will be fixed soon

exports.deleteReview = async (req, res) => {
 
  const { productId, reviewId } = req.query;
 


  try {
    // Find the product
    const product = await Product.findById(productId);

    // Check if product exists
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Find the review to be deleted
    const review = product.reviews.find((review) => review._id.toString() === reviewId);

    // Check if review exists
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    // Check if user is authorized to delete review
    if (review.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'You are not authorized to delete this review' });
    }

    // Remove the review from the array
    product.reviews = product.reviews.filter((review) => review._id.toString() !== reviewId.toString());

   
  

    // Update the product's ratings and number of reviews
    if(product.reviews.length > 0) 
    product.ratings = product.reviews.reduce((total, review) => total + Number(review.rating), 0) / product.reviews.length;
    else
    product.ratings = 0;

    product.numOfReviews = product.reviews.length;



    // Save the updated product
    await product.save();

   res.status(200).json({ message: 'Review deleted successfully' });

  } catch (error) {
    return res.status(500).json({ message: 'Error deleting review', error });
  }
};





















































































// // Filter Product
//  exports.filterProducts = async (req, res, next) => {
//   try {
  
//     const { category, minPrice, maxPrice, minRating } = req.query;
    
//     // Construct the filter object based on the query parameters
//     const filter = {};
//     if (category) {
//       filter.category = category;
//     }
//     if (minPrice) {
//       filter.price = { $gte: minPrice };
//     }
//     if (maxPrice) {
//       filter.price = { ...filter.price, $lte: maxPrice };
//     }
//     if (minRating) {
//       filter.rating = { $gte: minRating };
//     }

//     // Query the database with the filter object
//      const products = await Product.find(filter)
//     res.json(products);
//   } 
//   catch (error) {
//      console.error(error);
//        res.status(500).json({ message: 'Internal server error' });

//   }
// }
 

// //Pagination
// exports.productPagination = async (req, res, next) => {
//   try {
//     const page = req.query.page ? parseInt(req.query.page) : 1;
//     const limit = req.query.limit ? parseInt(req.query.limit) : 10;
//     const skip = (page - 1) * limit;
//     const count = await Product.countDocuments();
//     const totalPages = Math.ceil(count / limit);

//     const products = await Product.find().skip(skip).limit(limit).lean();

//     res.status(200).json({
//       success: true,
//       data: products,
//       page,
//       limit,
//       totalPages,
//       count
//     });
//   } catch (error) {
//     console.error(error);
//        res.status(500).json({ message: 'Internal server error' });
//   }
// };
