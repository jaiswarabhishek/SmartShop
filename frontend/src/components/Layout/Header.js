import React from 'react'
// import {ReactNavbar} from "overlay-navbar"
import { Link } from 'react-router-dom'
// import { IconButton } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
// import LocalMallIcon from '@mui/icons-material/LocalMall';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import DetailsUser from './DetailsUser';
import {reactLocalStorage} from 'reactjs-localstorage';
import { useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';





function Header({isAuthenticated, user  }  ) {

     const dispatch = useDispatch()

    const { cartItems } = useSelector(state => state.cart)



  

  

  const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: 23,
    top: 1,
    border: `1px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));
  



  return (
  // <div className='bg-[#24292e]'>
        <nav className="sticky top-0 z-10 bg-white">

            <div className='md:flex  p-3 justify-between align-middle bg-gray-800'>
                {/* logo */}
                <div>
              <h3 className='cursor-pointer flex text-[#fff]  font-serif md:text-3xl text-xl  '>
            <img className='md:w-10 md:h-10 w-7  h-7 mr-1 justify-center' src="https://cdn-icons-png.flaticon.com/512/9149/9149134.png" alt="" />
                 SmartShop
              </h3>

                </div>
                {/* links */}
                <div className='md:block hidden my-auto  gap-4'>
               <ul className='text-[1.1em]  ' >
                <Link to="/" className='m-5 text-[#fff]'>Home</Link>
                <Link to="/products" className='m-5 text-[#fff]'>Products</Link>
                <Link to="/contact" className='m-5 text-[#fff]'>Contact</Link>
                <Link to="/about" className='m-5 text-[#fff]'>About</Link>
               </ul>
                </div>

                {/* login,profile,search */}
                <div className='md:block hidden  gap-4 '>
               
                   <Link to="/search"  >
                   <SearchIcon  sx={{width:30,height:30,marginRight:3,color:'white' }}    />
                   </Link>


                   <Link to='/cart' >
                <StyledBadge badgeContent={cartItems.length || 0} color="primary">
                 <ShoppingCartIcon  sx={{width:30,height:30,marginRight:3,color:'white' }} />
               </StyledBadge>
                   </Link>


                 {
                    isAuthenticated ? <DetailsUser user={user} /> :
                   <Link to='/login' >
                     <AccountBoxIcon sx={{width:30,height:30,marginRight:3,color:'white' }} className='text-[#fff]'/>
                   </Link>

                  }

                </div>
                {/* hamburger */}
                <div className='md:hidden block'>

                </div>
            </div>
  
        </nav>
// </div>

  )
}

export default Header
