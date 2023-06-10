import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import CartItems from './CartItems'
import { addToCart,removeFromCart } from '../actions/cartAction'
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

function Cart() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { cartItems } = useSelector(state => state.cart)

    const increaseQty = (id, quantity, stock) => {
        const newQty = quantity + 1

        if (newQty > stock) return;

        dispatch(addToCart(id, newQty))
    }

    const decreaseQty = (id, quantity) => {
        const newQty = quantity - 1

        if (newQty <= 0) return;

        dispatch(addToCart(id, newQty))

    }

    const removeItem = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
        navigate('/login?redirect=shipping')

    }



  return (<>
    <div className='p-10'>

  { cartItems.length===0?<> <RemoveShoppingCartIcon  sx={{display:"flex" ,justifyContent:"center" , width:"100%", height:"50vh" }}  />
  <h1 className='flex justify-center text-xl font-semibold'>No Item in Cart</h1>
   </> :  <div>

            <h1 className='md:text-3xl font-bold text-center md:mb-20 mb-5 '>YOUR BAG</h1>

            <div>

                {

               cartItems &&   cartItems.map((item)=>{
                        const { stock,quantity,image,price,name,product } = item

                        return <>
                        <div className='grid grid-cols-2 mb-10   align-middle'>

                            <div className='grid grid-cols-2  align-middle'>

                                <div className='text-center'>
                              <img src={image} className='block md:max-w-[50%] md:w-[50%] max-w-[100%] w-[100%]  mx-auto my-auto ' alt="" />
                                </div>

                                <div className='my-auto md:ml-0   ml-2  ' >
                                    <h1 className='md:text-xl font-bold  text-[0.65em]'>{name}</h1>
                                    <p className='font-[400] md:text-[1em] text-[0.6em]' >${price}</p>
                                    <button onClick={()=>removeItem(product)} className='text-red-400 font-semibold	 md:text-[0.9em] text-[0.6em]'>Remove</button>
                                </div>

                            </div>

                            <div className='my-auto mx-auto border-t-2 border-b-2 border-gray-200 rounded-md'>
                                 <button onClick={()=>decreaseQty(product,quantity  )  }  className="bg-gray-300  hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">
                                  &#x2212;
                                </button>

                              <span className="mx-4  my-auto">{quantity}</span>

                            <button onClick={()=>increaseQty (product,quantity,stock)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r">
                             &#x2b;
                           </button>

                            </div>
                        </div>
                        
                        </>
                    })
                    
                    
                }
                <hr className='border-black border-1 w-[90%] mx-auto ' />

                <div className='flex  justify-between w-[75%] mx-auto mt-6'>
                    <h1 className=' font-bold text-[0.9em] md:text-xl'>Total ( {cartItems.reduce((acc, item) => (acc + Number(item.quantity)), 0)} items )</h1>

                    <h1>
           <span className='font-bold text-[0.9em] md:text-xl'>${cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)}</span>
                    </h1>

                </div>

                <div className='flex justify-center'>
                    <button onClick={checkoutHandler} className='bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium  text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 text-white  tracking-widest rounded-full mt-10'>CHECKOUT</button>
                </div>
            </div>
        </div>

  }

    </div>
 </> )
}

export default Cart
