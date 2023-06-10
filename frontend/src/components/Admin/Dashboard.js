import React from 'react'
import Sidebar from './Sidebar'
import MetaData from '../Layout/MetaData'
import { Link } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { useState,useEffect } from 'react'
import { getAdminProducts, clearErrors } from '../../actions/productAction'
import { Bar ,Line , Doughnut} from "react-chartjs-2";
import { CategoryScale,LinearScale, Chart as ChartJS, LineController, LineElement, PointElement, Title, 
 BarController, BarElement, Tooltip, Legend, PieController, ArcElement, DoughnutController,
} from 'chart.js';

import { useAlert } from 'react-alert';

function Dashboard() {

  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error, products } = useSelector(state => state.adminProducts)

  let outOfStock = 0;
  
  products && products.forEach(product => {
    if (product.quantity === 0) {
      outOfStock += 1;
    }
  })

  useEffect(() => {
    dispatch(getAdminProducts());
    if (error) {
      alert.error(error);
      dispatch(clearErrors())
    }
  }, [dispatch, alert, error])




  ChartJS.register(
    CategoryScale,
    LinearScale,
    LineController,
    LineElement,
    PointElement,
    Title,
    BarController,
    BarElement,
    Tooltip,
    Legend,
    PieController,
    ArcElement,
    DoughnutController
  );

  
const doughnutData = {
  labels: [ 'Out of Stock', 'In Stock'],
  datasets: [
    {
      label: "Products",
      data: [outOfStock, products && products.length],
      backgroundColor: [
        "#FF0060",
        "#9376E0",
        
      ],
      borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
      borderWidth: 1,


    },
  ],

};
  

   



    



  return (<>
    <MetaData title={'Dashboard'} />
      <div className='flex '>
      <Sidebar />

      <div className=' w-full'>

        <h1 className='text-3xl font-medium text-center my-4'>Dashboard</h1>

        <div className='flex flex-col'>
            {/* <div className=' border border-gray-300 p-2 rounded-lg m-2 bg-[#B799FF]'>
                
                <h1 className='text-xl text-white font-medium text-center m-2'>Total Amounts $5000</h1>

                </div> */}

                {/* Products */}

                <div className='  p-4 rounded-lg flex justify-center m-4'>

                    <Link
                    to='/admin/products'
                    className='md:mx-5 mx-2 shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-5 w-1/4 mx-w-[80%] rounded-md  bg-purple-500 '
                    >
                    <h1 className='text-xl font-medium text-center text-white'>Products</h1>
                    <h1 className='text-xl font-medium text-center text-white'>

                    {products && products.length}
                    </h1>
                    
                    </Link>

                    <Link
                    className='md:mx-5 mx-2  shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-5 w-1/4  rounded-md bg-pink-500'
                    to='/admin/orders'
                    >
                    <h1 className='text-xl font-medium text-center text-white'>Orders</h1>
                    <h1 className='text-xl font-medium text-center text-white'>500</h1>

                    </Link>

                    <Link
                    className='md:mx-5 mx-2 shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-5 w-1/4 rounded-md bg-cyan-500'
                    to='/admin/users'
                    >
                    <h1 className='text-xl font-medium text-center text-white'>Users</h1>
                    <h1 className='text-xl font-medium text-center text-white'>500</h1>
                    </Link>

                    </div>

                    <div
                    className='shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-5 w-[90%] max-w-[90%] mx-auto rounded-md bg-white m-4'
                    >
  <Line
          data={{
            // Name of the variables on x-axies for each bar
            labels: ["1st bar", "2nd bar", "3rd bar", "4th bar"],
            datasets: [
              {
                // Label for bars
                label: "total count/value",
                // Data or value of your each variable
                data: [1552, 1319, 613, 1400],
                
                backgroundColor:"#120907",
               
                // Border color of each bar
                borderColor: "#120907",
                borderWidth: 0.5,
              },
            ],
          }}
          // Height of graph
          height={400}
          options={{
            maintainAspectRatio: false,
            scales: {
              yAxes: [
                {
                  ticks: {
                    // The y-axis value will start from zero
                    beginAtZero: true,
                  },
                },
              ],
            },
            legend: {
              labels: {
                fontSize: 15,
              },
            },
          }}
        />

                       
 </div>

  <div
                    className=' p-5 w-[90%] max-w-[90%] mx-auto rounded-md bg-white m-4'
                    >
  <Doughnut data={doughnutData}
  
  height={400}
  options={{
    maintainAspectRatio: false,
    scales: {
      yAxes: [
        {
          ticks: {
            // The y-axis value will start from zero
            beginAtZero: true,
          },
        },
      ],
    },
    legend: {
      labels: {
        fontSize: 15,
      },
    },
  }}

  
  />


</div>




            </div>
   

                

      </div>

      </div>

     
</>)
}

export default Dashboard
