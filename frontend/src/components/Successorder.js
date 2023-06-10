import React from 'react'
import check from '../assets/checkIcon.png'
import { Link } from 'react-router-dom'

function Successorder() {
  return (
     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md px-4 py-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-4 text-green-600">Order Placed Successfully!</h1>
        <p className="text-lg mb-6">Thank you for your order. The payment has been successfully processed.</p>
        <img
          src={check} // Replace with your success image URL
          alt="Success"
          className="w-48 mx-auto mb-6 bg-white"
        />
         <Link to='/orders'
            className="focus:outline-none flex justify-center w-full text-white bg-green-600 hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            View Orders
          </Link>
      </div>
    </div>
  )
}

export default Successorder
