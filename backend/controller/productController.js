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
    const { page = 1, limit = 10, category, priceMin, priceMax, ratingMin, ratingMax } = req.query;

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
    next(error);
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







