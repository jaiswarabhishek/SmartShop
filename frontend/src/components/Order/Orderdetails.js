import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { useEffect,useState } from 'react'
import { useAlert } from 'react-alert'
import { getOrderDetails,clearErrors  } from '../../actions/orderAction'
import MetaData from '../Layout/MetaData'
import Loader from '../Layout/loader'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'


function Orderdetails() {

    const {id} = useParams()

    const dispatch = useDispatch()
    const alert = useAlert()

    const { loading, error, order } = useSelector(state => state.orderDetails)


    useEffect(() => {

        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }

        dispatch(getOrderDetails(id))
    }, [dispatch,id, error,alert])

    console.log(order)


  return ( <>
    
    <MetaData title='Order Details' />
    {loading ? <Loader /> : (
        <>
       <div>


        <div className=' md:grid grid-cols-2  gap-10   '>

            <div className='md:pl-[3em] md:pt-[1em]   p-2 mb-10  '>
         <h1 className='text-2xl font-semibold mb-5 text-red-400 '>Order # {order._id}</h1>

            <div >
                <h1
                className='text-2xl font-semibold'
                >Shipping Info :</h1>

                <p
                className=' mt-5'
                >
                    <strong>Name:</strong> {order.user && order.user.name}
                
                </p>

                <p
                className=' mt-5'
                >
                    <strong>Phone:</strong> {order.shippingInfo && order.shippingInfo.phoneNo}

                </p>

                <p
                className=' mt-5'
                >

                    <strong>Address:</strong> {order.shippingInfo && order.shippingInfo.address}, {order.shippingInfo && order.shippingInfo.city}, {order.shippingInfo && order.shippingInfo.postalCode}, {order.shippingInfo && order.shippingInfo.country}

                </p>
                


            </div>

            <div className='mt-10'>
                <h1
                className='text-2xl font-semibold'
                >Payment :</h1>

               {/* Status Succeded then display greed otherwise red */}

               <p
                className=' mt-2'
                >

                    <strong>Status:</strong> {order.paymentInfo && order.paymentInfo.status === 'succeeded' ? <span className='text-green-500 font-semibold'>Paid</span> : <span className='text-red-500 font-semibold'>Not Paid</span>}
                </p>

               

                <p
                className=' mt-2'
                >

                    <strong>Amount:</strong> ${order.totalPrice}

                </p>

                {/* Order Status */}

                <h1
                
                className='text-xl font-semibold mt-5'
                > 
                Order Status :

                </h1>

                <p
                className=' mt-2'
                >

                    <strong>Order Status:</strong> {order.orderStatus && String(order.orderStatus).includes('Delivered') ? <span className='text-green-500 font-semibold'>{order.orderStatus}</span> : <span className='text-red-500 font-semibold'>{order.orderStatus}</span>}
                </p>

            </div>


            <div className='mt-5'>

                <h1
                className='text-2xl font-semibold'
                >
                    Order Items :
                </h1>
         
                {
                order.orderItems&&order.orderItems.map(item => (
                        <div

                        className='flex flex-col md:flex-row mt-5 justify-between items-center  pb-5  pt-5'
                         
                        key={item.product}>
                            <img
                            className='w-[40%] md:w-32 md:h-32 object-cover'
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



          

        </div>



    </div>
        




                        
        </>

    )}











    </>)
}

export default Orderdetails
