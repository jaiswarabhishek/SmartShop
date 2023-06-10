import React from 'react';
import Product from './Product';
import MetaData from './Layout/MetaData';
import { getProducts } from '../actions/productAction';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Loader from './Layout/loader';
import { useAlert } from 'react-alert';





function Home() {
  const alert = useAlert();

    const dispatch = useDispatch();

  const { loading, products, error, productsCount } = useSelector(
    (state) => state.products
  );



    useEffect(() => {
         
        if (error) {
            return alert.error(error);
        }
        
        dispatch(getProducts())
    }, [dispatch, alert, error])
    


 
     

  return (<>

  
     <div>
        <MetaData title="Home" />
      <div className="bg-gray-900 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-5xl text-white font-bold text-center mb-8">Welcome to SmartShop</h1>
          <p className="text-xl md:text-2xl text-white text-center mb-12">Discover amazing products at great prices.</p>
          <div className="flex justify-center">
            <button className="bg-indigo-600 text-white rounded-md px-6 py-3 text-xl ">Shop Now</button>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4  py-12">
        
        <h2 className="text-xl md:text-3xl font-medium  text-center mb-[2em] border-b border-black md:w-[30%] w-[60%] mx-auto p-2 ">Featured Products</h2>
       { loading? <Loader/>: <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            
          {products&&products.map((product) => (
            <Product id={product._id} name={product.name} price={product.price} image={product.images} rating={product.rating} ratings={product.ratings} reviewsCount={product.numOfReviews}  />
            
          ))}
        </div>
} 
      </div>
    </div>
 
  </>);
}

export default Home;
