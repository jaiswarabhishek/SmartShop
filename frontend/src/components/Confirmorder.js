import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Checkoutstep from './Checkoutstep'
import MetaData from './Layout/MetaData'
import { Typography } from '@mui/material'
import { Link } from 'react-router-dom'


function Confirmorder() {

    const navigate = useNavigate()
    

    const { cartItems, shippingInfo } = useSelector(state => state.cart)
    const { user } = useSelector(state => state.user)

    const subtotal = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0)
    const shippingCharges = subtotal > 200 ? 0 : 25
    const tax = ((subtotal * 5) / 100)
    const total = (subtotal + shippingCharges + tax)


    const proceedToPayment = () => {
        const data = {
            subtotal,
            shippingCharges,
            tax,
            total
        }
        sessionStorage.setItem('orderInfo', JSON.stringify(data))

        navigate('/payment')

    }







  return (<>
    <MetaData title="Confirm Order" />
    <Checkoutstep activeStep={1}/>
    <div>

        <div className=' md:grid grid-cols-2 mt-20 gap-10   '>

            <div className='md:p-[5em]  border-r-2 p-2 mb-10  '>

            <div >
                <h1
                className='text-2xl font-semibold'
                >Shipping Info :</h1>

                <p
                className=' mt-5'
                >
                    <strong>Name:</strong> {user && user.name}
                
                </p>
                

                <p className='mt-2'>
                    <strong>Phone:</strong> {shippingInfo.phoneNo}
                </p>
                <p className='mt-2'>
                    <strong>Address:</strong> {`${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`}
                </p>

            </div>

            <div className='mt-5'>

                <h1
                className='text-2xl font-semibold'
                >
                    Your Cart Items :
                </h1>
         
                {
                cartItems&&cartItems.map(item => (
                        <div

                        className='flex flex-col md:flex-row mt-5 justify-between items-center border-b-2 pb-5  pt-5'
                         
                        key={item.product}>
                            <img
                            className='w-20 h-20 md:w-32 md:h-32 object-cover'
                            src={item.image} alt={item.name} />

                            <Link
                            className='text-blue-500 hover:underline'
                            to={`/product/${item.product}`}>{item.name}</Link>

                            <p>{item.quantity} x ${item.price} = <strong>${(item.quantity * item.price).toFixed(2)}</strong></p>
                        </div>
                    ))
                }
    

            </div>

            </div>



            <div className='md:p-[5em]  border-r-2 p-2 mb-10  ' >
                <h1 className='text-2xl text-center font-semibold border-b-2 pb-5' >
                    Order Summary
                </h1>

               <div>

                <p className='flex justify-between mt-5'>
                    <span className='font-semibold'>Subtotal</span>
                    <span>${subtotal  }</span>
                </p>

                {/* Shipping Charges */}
                <p className='flex justify-between mt-5'>
                    <span className='font-semibold'>Shipping</span>
                    <span>${shippingCharges}</span>
                </p>

                <p className='flex justify-between mt-5'>
                    <span className='font-semibold'>Tax</span>
                    <span>${tax}</span>
                </p>

                <p className='flex justify-between mt-5 border-t-2 pt-5'>
                    <span className='font-semibold'>Total</span>
                    <span>${total }</span>
                </p>
                
               </div>

              
              <div className='flex justify-center'>
               <button

                onClick={proceedToPayment}
               
               className=' w-full   mt-10 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 '>
                     Place Order
               </button>
               </div>

            </div>

        </div>



    </div>
  </>)
}

export default Confirmorder
