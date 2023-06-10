import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { getProducts,clearErrors } from '../actions/productAction'
import Loader from './Layout/loader'
import Product from './Product'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useState } from 'react'
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import { Category } from '@mui/icons-material'
import { useAlert } from 'react-alert'
import MetaData from './Layout/MetaData'

function Allproducts() {
const [keyword, setKeyword] = useState('')
    const [page, setPage] = useState(1)
    const [price, setPrice] = useState([1,500])
    const [ratings, setRatings] = useState(0)
    const [category, setCategory] = useState('')
      
    const dispatch = useDispatch()

    const alert = useAlert()



    const {loading,products,error, productsCount,limit} = useSelector(state => state.products)

    
    // Rating

  

    // Number of Total Pages
    let count = Math.ceil(productsCount/limit)

    const handleChange=(page)=>{
       setPage(page);
       
       window.scrollTo(0, 0);
    }

   

    const priceHandler = (event, newValue) => {
    setPrice(newValue);

    };
  

    



    useEffect(() => {
        if(error){
             alert.error(error)
            dispatch(clearErrors())
        }

        dispatch(getProducts(keyword,page, price, category, ratings))
    }, [dispatch , page, error, keyword,price,category, ratings, alert])



  return (<>
  <MetaData title='All Products'/>
  
  <div className='md:flex justify-center md:min-h-[100vh]  align-middle '>

 <div className='absolute  left-0  top-12  '>
    
     <h1  variant="h6"  className="md:mt-[8em] md:ml-10 text-[1.1em] font-medium">
       Price
      </h1>

  <Slider className='mx-auto '  sx={{width:150,marginLeft:5}}
        aria-labelledby="range-slider"
       
        value={price}
        onChange={priceHandler}
        valueLabelDisplay="auto"
        min={1} 
        max={500}
      />

      <div className='md:ml-10'>
       <h6 className='font-medium mb-1'>Categories </h6>

       {
          ['Electronics','Cameras','Laptop','Accessories','Headphones','Food','Books','Clothes/Shoes'].map((c)=>(
            <div key={c}>

              {/* li should active if category is equal to c */}

              <button   className='   text-slate-600	 mr-2 cursor-pointer list-none	hover:scale-109 focus:text-rose-600 transition duration-300 ease-in-out	  ' name='category' onClick={()=> setCategory(c) } >
               {c}
              </button>
              
            </div>
          ))


       }


      </div>

      <fieldset className='mt-4'>
        <legend className='font-medium md:ml-10'>Ratings</legend>
        <Slider className='mx-auto '  sx={{width:150,marginLeft:5}}
        aria-labelledby="continuous-slider"
       
        value={ratings}
        onChange={(e,newRating)=>{
          setRatings(newRating)
        }}
        
        valueLabelDisplay="auto"
        min={0} 
        max={5}
      />
      </fieldset>

    

   </div>


  {
        loading ? <Loader/> : (

            <div className=" md:ml-[13em] container  px-4 py-12">


            <h2 className="text-xl md:text-3xl font-medium  text-center mb-[2em] border-b border-black md:w-[30%] w-[60%] mx-auto p-2 ">All Products</h2>
              { loading? <Loader/>: <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

                {products&&products.map((product) => (
                    <Product id={product._id} name={product.name} price={product.price} image={product.images} rating={product.rating} ratings={product.ratings} reviewsCount={product.numOfReviews}  />

                ))}
                </div>}

                
            </div>

           
        )

  }
</div>
       <div className='flex justify-center m-5'>
   <Stack spacing={2}>
     
      <Pagination  onChange={(e)=>handleChange(e.target.textContent)} hidePrevButton hideNextButton  count={count} color="primary" />
     
    </Stack>
    </div>
  
  
  </> 
  )
}

export default Allproducts
