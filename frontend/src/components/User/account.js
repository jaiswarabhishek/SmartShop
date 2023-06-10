import React from 'react'
import MetaData from '../Layout/MetaData'
import Loader from '../Layout/loader'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useEffect } from 'react'
import {useNavigate} from "react-router-dom"
import Avatar from '@mui/material/Avatar';



function Account() {

    const navigate = useNavigate();

    const { user, loading,isAuthenticated } = useSelector(state => state.user)

    useEffect(() => {
        if(!isAuthenticated)
        {

            navigate('/login')

        }
    }, [isAuthenticated, navigate])




  return (<>
    <MetaData title={'Account'}/>
  
  {
        loading ? <Loader/> : <div  className='md:p-[4em]'>
                 <div  className='md:flex  '>

                    <div className='text-center  w-[60%] '>

            
           {
           user.avatar && <img src={user.avatar.url} className='block max-w-[50%] w-[50%] rounded-lg mx-auto shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] mb-5' alt="" />
           }       
<p className='text-center font-sans text-xl m-5 font-medium'>{user.name}</p>
                    </div>



                    <div className='py-6' >
                    
                  

                   <div className='text-center m-3'>
                    <h1 className='text-[1.1em] font-semibold'>Email address :</h1>
                    <p>{user.email}</p>
                    </div>

                    <div className='text-center m-3'>
                    <h1 className='text-[1.1em] font-semibold'>Joined on :</h1>
                    <p>{String(user.createdAt).substring(0, 10)}</p>
                    </div>

                    
                    <div className='mx-auto' >
                        <button className= ' m-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 '  >My Orders</button>
                     <Link to="/me/update" className= 'm-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 '   >Edit Profile</Link>

                    </div>




                    </div>

                 </div>

        </div>
        
            
  }

    


  </>)
}

export default Account
