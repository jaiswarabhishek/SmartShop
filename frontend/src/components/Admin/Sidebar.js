import React from 'react'
import { Link } from 'react-router-dom'
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import WidgetsIcon from '@mui/icons-material/Widgets';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import GroupIcon from '@mui/icons-material/Group';
import RateReviewIcon from '@mui/icons-material/RateReview';
function Sidebar() {
  return (<>
 <div className="md:flex hidden  bg-gray-200">
      {/* Sidebar */}
      <div className="flex  flex-col bg-white w-64 ">
        {/* Sidebar content */}

        <div className="flex  flex-col items-center   bg-gray-50 dark:bg-gray-800 border-r-2  h-full">
            
           
            <div className="flex flex-col w-full h-full overflow-y-auto bg-gray-800 pb-[10em]">
                <ul className="flex flex-col py-4 space-y-1 gap-4 text-white">
                    <li className="px-5">
                        <div className="flex flex-row items-center h-8">
                            <div className="flex font-semibold text-[1.2em]  my-8"> Main </div>
                        </div>
                    </li>
                    <li >
                        <Link to="/dashboard" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-700 cursor-pointer w-full">
                            <span className="inline-flex justify-center items-center ml-4">
                                <DashboardIcon
                                 sx={{ mr: 1, my: 0.5, width: 35, height: 35 }}
                                />
                            </span>
                            <span className="m-2 text-[1em] tracking-wide truncate  font-medium">Dashboard</span>
                        </Link>
                    </li>

                    <li >
                        <Link to="/admin/products" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-700 cursor-pointer w-full">
                            <span className="inline-flex justify-center items-center ml-4">
                                <WidgetsIcon
                                
                                sx={{  mr: 1, my: 0.5, width: 35, height: 35 }}
                                />
                            </span>
                            <span className="ml-2 text-[1em] tracking-wide truncate font-medium">Products</span>
                        </Link>
                    </li>

                    <li>
                        <Link to="/admin/product" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-700 cursor-pointer w-full">
                            <span className="inline-flex justify-center items-center ml-4">
                                <AddCircleIcon
                                 sx={{ mr: 1, my: 0.5, width: 35, height: 35 }}
                                />
                            </span>
                            <span className="ml-2 text-[1em] tracking-wide truncate font-medium">Add Product</span>
                        </Link>
                    </li> 
                    
                    <li>
                        <Link to="/admin/orders" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-700 cursor-pointer w-full">
                            <span className="inline-flex justify-center items-center ml-4">
                                <AddShoppingCartIcon
                                 sx={{ mr: 1, my: 0.5, width: 35, height: 35 }}
                                />
                            </span>
                            <span className="ml-2 text-[1em] tracking-wide truncate font-medium">Orders</span>
                        </Link>
                    </li> 
                    
                    <li>
                        <Link to="/admin/users" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-700 cursor-pointer w-full">
                            <span className="inline-flex justify-center items-center ml-4">
                                <GroupIcon
                                 sx={{  mr: 1, my: 0.5, width: 35, height: 35 }}
                                />
                            </span>
                            <span className="ml-2 text-[1em] tracking-wide truncate font-medium">Users</span>
                        </Link>
                    </li> 
                    
                     <li>
                        <Link to="/admin/reviews" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-700 cursor-pointer w-full">
                            <span className="inline-flex justify-center items-center ml-4">
                                <RateReviewIcon
                                 sx={{  mr: 1, my: 0.5, width: 35, height: 35 }}
                                />
                            </span>
                            <span className="ml-2 text-[1em] tracking-wide truncate font-medium">Reviews</span>
                        </Link>
                    </li> 
                  

                    </ul>

                    </div>
                    </div>
                   
                  
                    
        {/* ... */}
      </div>




    </div>
    </>
  )
}

export default Sidebar
