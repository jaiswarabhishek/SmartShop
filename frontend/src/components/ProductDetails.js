import React from 'react'
import { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom';
import Carousel from 'react-material-ui-carousel'
import {useSelector, useDispatch} from 'react-redux'
import { getProductDetails } from '../actions/productAction'
import Loader from './Layout/loader';
import StarRatingComponent from 'react-star-rating-component'
import ReviewCard from './ReviewCard';
import { useAlert } from 'react-alert';
import MetaData from './Layout/MetaData';
import { addToCart } from '../actions/cartAction';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import {newReview} from '../actions/productAction';

import {NEW_REVIEW_RESET} from '../constants/productConstant'


function ProductDetails() {

  const alert = useAlert();
  const [quantity, setQuantity] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [open, setOpen] = useState(false);

  const incrementQuantity = () => {

    const count = quantity + 1

    if(count > product.quantity) return;

    setQuantity(count)

  }

  const decrementQuantity = () => {

    const count = quantity - 1

    if(count < 1) return;

    setQuantity(count)
  }

  //  const reviews = [
  //   {
  //     name: 'John Doe',
  //     role: 'CEO',
  //     comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  //   },
  //   {
  //     name: 'Jane Smith',
  //     role: 'Designer',
  //     comment: 'Praesent volutpat nisi sed aliquam tristique.',
  //   },
  //   {
  //     name: 'Mark Johnson',
  //     role: 'Developer',
  //     comment: 'Vestibulum id justo vel nulla faucibus aliquet.',
  //   },  {
  //     name: 'Mark Johnson',
  //     role: 'Developer',
  //     comment: 'Vestibulum id justo vel nulla faucibus aliquet.',
  //   },
  // ];

  const {id} = useParams()
  


  const dispatch = useDispatch()

  const {loading, error, product} = useSelector(state => state.productDetails)

  const {success, error:reviewError  } = useSelector(state => state.newReview)

   
  const addToCartHandler = () => {
    dispatch(addToCart(id, quantity))
    alert.success('Item Added to Cart')
  }

  const submitReviewToggle = () => {

    open ? setOpen(false) : setOpen(true)

  }

  const submitReviewHandler = () => {

    const formData = new FormData()

    formData.set('rating', rating)
    formData.set('comment', comment)
    formData.set('productId', id)

    dispatch(newReview(formData))
    setOpen(false)
  }
  

  useEffect(() => {

    if(error){
      return alert.error(error)
    }

    if(reviewError){
      return alert.error(reviewError)
    }

    if(success){
      alert.success('Review Posted Successfully')

      dispatch({type: 'NEW_REVIEW_RESET'})
    }

    dispatch(getProductDetails(id))

  }, [dispatch, id, alert, error, reviewError,success])




  return (<>

  { loading ? <Loader/> : 
 
 <div className="md:flex md:flex-row md:justify-evenly grid    p-[6vmax]">
    <MetaData title={product.name} />

   <div className='md:min-w-[50%] my-auto  '>
    <Carousel  >

        {
            product.images && product.images.map( (item, i) => <img key={i} className='block md:w-[55%]  md:max-w-[90%] sm:w-[50%]  object-cover  mx-auto w-[60%] ' src={item.url} alt={product.name} /> )
        }

    </Carousel>
   </div>
   <div className=' md:w-[70%] text-center '>

  <div className="">
   <h2 className='text-center font-bold m-4 text-2xl'>
    {product.name}
   </h2>
  </div>

  <div className='flex align-middle justify-center'>
     <StarRatingComponent
                 edit="false"
                 color= "gray"
                 activeColor= "yellow"
                 size= "window.innerWidth < 768 ? 20 : 30"
                 value= {product.ratings}
                 isHalf= "true"
                />
   <p className="text-gray-600 ml-1 mb-2 ">({product.numOfReviews} reviews)</p>
                {/* <h1 className='text-xl font-medium' >${product.price.toFixed(2)}</h1> */}
  </div>

  <div>
 <h1 className='text-2xl font-medium ' >${product.price}</h1>

<div className="inline-flex m-3 border-t-2 border-b-2 border-gray-200 rounded-md">
  <button  onClick={decrementQuantity} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">
   &#x2212;
  </button>

 <span className="mx-4  my-auto">{quantity}</span>

  <button onClick={incrementQuantity} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r">
    &#x2b;
  </button>
</div>

<div >
<button  
disabled={product.quantity <1 ? true : false }
onClick={ addToCartHandler } class=" bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium  text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 text-white   rounded-full">
  Add to Cart
</button>
</div>



  </div>


  <p className='font-medium mt-4'>
    Status:
    {product.quantity > 0 ? <span className='text-green-500 m-1'>In Stock</span> : <span className='text-red-500 m-1'>Out of Stock</span>}

  </p>

 
 <div className='m-2 w-[50%] mx-auto ' >

  <h2 className='text-[1.1em] font-medium'>Description :</h2>
  <p className='text-[0.9em]'>{product.description}  </p>
 </div>

<button
onClick={submitReviewToggle}
class="text-white mt-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium  text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800  f py-2 px-4 rounded-full">
  Submit Review
</button>
           {/* <textarea id="comment" rows="4" class="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="Write a comment..." required></textarea> */}


</div>

  </div>
}

  {loading? <Loader/> : <div className="container mx-auto p-4 ">
      <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>


       <Dialog
       aria-labelledby='simple-dialog-title'
        open={open}
        onClose={submitReviewToggle}
       >
          <DialogTitle id='simple-dialog-title'>Add Review</DialogTitle>

          <DialogContent>

            <Rating
            onChange={(e) => setRating(e.target.value)}
            value={rating}
            size='large'
            
            />
     <textarea
     value={comment}

      onChange={(e) => setComment(e.target.value)}
     
     id="comment" rows="4" class=" text-sm bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 " 
     placeholder="Write a comment..." required></textarea>

           <DialogActions>
            <button
            onClick={submitReviewToggle}
            className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'
            >Cancel</button>

            <button
             
             onClick={submitReviewHandler}
            className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
            >Submit</button>
           </DialogActions>

          </DialogContent>


       </Dialog>

      


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4  ">
        { product.reviews && product.reviews[0]? product.reviews.map((review) => (
          <ReviewCard review={review} />
        )
        
        ): <p className=' '  >No Reviews</p>  
        
        }
      </div>


</div>
}
  </>

  )
}

export default ProductDetails
