import React from 'react'
import { useState } from 'react'
import Product from '../Product'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getProducts } from '../../actions/productAction'
import Loader from '../Layout/loader'
import MetaData from './MetaData'

function Search() {

    const [keyword, setKeyword] = useState('')
     const [page, setPage] = useState(1)
     const [price, setPrice] = useState([1,500])
     const [category, setCategory] = useState('')
      const [ratings, setRatings] = useState(0)

    
  const dispatch = useDispatch();

  const { loading,  searchProducts, error, productsCount } = useSelector(
    (state) => state.products
  );

  
console.log(searchProducts)

    useEffect(() => {
         
        if (error) {
            return alert.error(error);
        }
        
        dispatch(getProducts(keyword,page, price, category, ratings))
    }, [dispatch, error, keyword, page,price,category, ratings])
    
    // const searchSubmitHandler = (e) =>{
    //     e.preventDefault()
    //     if(keyword.trim()){

    //         window.location.href = `/products/${keyword}`

    //     }else{
    //         window.location.href = `/`
    //     }
    // }

  return (<>
  <MetaData title={'Search Products'} />
   {/* Search Products */}
    <form  className={ `${ keyword?'container mx-auto px-4  py-12': 'container mx-auto px-4  py-12 h-[100vh]'}`}>
        {/* <h2 className="text-xl md:text-3xl font-medium  text-center mb-[2em] border-b border-black md:w-[30%] w-[60%] mx-auto p-2 ">Search Products</h2> */}
        <div className="flex justify-center">
            <input type="text" className="border-2 border-black rounded-l-md p-2 w-[60%] md:w-[30%] " placeholder="Search Products...." onChange={(e)=>setKeyword(e.target.value)} />
            <button    className="bg-indigo-600 text-white rounded-r-md px-6 py-3 text-xl ">Search</button>
        </div>
    </form>

 <div className="container mx-auto px-4  py-10">
        
    
       { loading? <Loader/>: <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            
           { keyword&&searchProducts&&searchProducts.map((product) => (
            <Product id={product._id} name={product.name} price={product.price} image={product.images} rating={product.rating} ratings={product.ratings} reviewsCount={product.numOfReviews}  />
            
          ))}
        </div>
} 
      </div>
    

    </> )
}

export default Search