import React from 'react'
import { useAlert } from 'react-alert'
import { useSelector,useDispatch } from 'react-redux'
import MetaData from './Layout/MetaData'
import { useNavigate } from 'react-router-dom'
import { Typography } from '@mui/material'
import Checkoutstep from './Checkoutstep'
import { useState,useEffect,useRef } from 'react'
import {CardNumberElement,CardExpiryElement,CardCvcElement,useStripe,useElements} from '@stripe/react-stripe-js'
import axios from 'axios'
import baseUrl from '../baseUrl'
import CreditCardIcon from '@mui/icons-material/CreditCard';
import EventIcon from '@mui/icons-material/Event';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { createOrder,clearErrors } from '../actions/orderAction'


function Payment({stripeApiKey}) {

    const stripe = useStripe()
    const elements = useElements()
    const navigate = useNavigate()
    const alert = useAlert()
    const dispatch = useDispatch()
    const payBtn = useRef(null)

    const { user } = useSelector(state => state.user)
    const { cartItems, shippingInfo } = useSelector(state => state.cart)
    const { error } = useSelector(state => state.newOrder)

    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'))

    const paymentData = {

        // Dollar to cents
        amount: Math.round(orderInfo.total * 100)

    }

    const order = {
        orderItems: cartItems,
        shippingInfo,
        itemsPrice: orderInfo.subtotal,
        taxPrice: orderInfo.tax,
        shippingPrice: orderInfo.shippingCharges,
        totalPrice: orderInfo.total,

    }



    const  submitHandler =async (e) => {
        e.preventDefault()

        payBtn.current.disabled = true

        try{

            // authorization header using bearer auth stripe secret key

            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }



            const { data } = await axios.post(`${baseUrl}/api/v1/payment/process`,paymentData, {withCredentials:true}, config,)

            const clientSecret = data.clientSecret

            if (!stripe || !elements) {
                return;
            }

            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email,
                        address: {
                            line1: shippingInfo.address,
                            country: 'IN',
                            postal_code: shippingInfo.postalCode,
                            city: shippingInfo.city,
                            state: shippingInfo.state
                        }


                    }
                }
            });

            if (result.error) {
                payBtn.current.disabled = false
                alert.error(result.error.message)
                console.log(result.error.message)

            } else {



                if(result.paymentIntent.status === 'succeeded'){

                        order.paymentInfo={
                            id:result.paymentIntent.id,
                            status:result.paymentIntent.status
                        }

                        dispatch(createOrder(order))
    
                    navigate('/success')
                }
                else{
                    alert.error('There is some issue while payment processing')
                }

               
            }

        }
        catch(err){
            payBtn.current.disabled = false
            alert.error(err.response.data.message)
        }


    }

    useEffect(() => {


        if (error) {

            alert.error(error)
            dispatch(clearErrors())
        }

    }, [dispatch, alert, error])





    
  return (<>
    <MetaData title="Payment" />
    <Checkoutstep activeStep={2}/>
    <div className='max-w-md mx-auto m-[5em] p-[3em] bg-white shadow-lg rounded  '>

       <form action=""
       className=''
       onSubmit={(e)=>submitHandler(e)}
       >
        <h1 className='text-center text-xl font-semibold border-b-2 mb-8 w-1/2 mx-auto p-2'>Card Details</h1>

        <div className="mb-4">
          <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 ">
           <CreditCardIcon />
            <strong className='ml-1'>
            Card Number
            </strong>

          </label>
          <div className="mt-1">
            <CardNumberElement
              id="cardNumber"
              className="p-2 border border-gray-300 rounded"
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#4B5563',
                  },
                },
              }}
            />
          </div>
        </div>

         <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="expiry" className="block text-sm font-medium text-gray-700">
            <EventIcon />
             <strong className='ml-1'>
                Expiry Date
            </strong>
            </label>
            <div className="mt-1">
              <CardExpiryElement
                id="expiry"
                className="p-2 border border-gray-300 rounded"
                options={{
                  style: {
                    base: {
                      fontSize: '16px',
                      color: '#4B5563',
                    },
                  },
                }}
              />
            </div>
          </div>

          <div>
            <label htmlFor="cvc" className="block text-sm font-medium text-gray-700">
            <VpnKeyIcon />
            <strong className='ml-1'>
                CVC
            </strong>
            </label>
            <div className="mt-1">
              <CardCvcElement
                id="cvc"
                className="p-2 border border-gray-300 rounded"
                options={{
                  style: {
                    base: {
                      fontSize: '16px',
                      color: '#4B5563',
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>

        <input type="submit"
        className='cursor-pointer focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 w-full mt-5 mb-5'
        value={"Pay $"+`${orderInfo && orderInfo.total}`}
        ref={payBtn}
        />



       </form>




    </div>
    
    </>
  )
}

export default Payment
