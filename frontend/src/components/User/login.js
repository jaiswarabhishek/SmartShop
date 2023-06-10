import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import Logins from '../../assets/loginss.png'
import { useSelector,useDispatch } from 'react-redux'
import { login,clearErrors } from '../../actions/userAction'
import { useEffect } from 'react';
import {useAlert} from 'react-alert'
import Loader from '../Layout/loader'
import {useNavigate} from "react-router-dom"


const Login = () => {

  const dispatch = useDispatch()
  const alert = useAlert()
   const navigate = useNavigate();

  const {isAuthenticated,error,loading} = useSelector(state => state.user)
  console.log(isAuthenticated)

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here) 
    dispatch(login(email,password))
  };

const redirect = window.location.search ? '/'+ window.location.search.split("=")[1] :'/account'


 
  useEffect(() => {
    if(error){
      alert.error(error)
      dispatch(clearErrors())
    }

    if(isAuthenticated){

      navigate(redirect)
    }
  }, [dispatch,error, alert,isAuthenticated, navigate, redirect])


  return (<>

    <div className="flex items-center justify-center min-h-screen bg-gray-100 shadow-2xl ">
   
   {loading? <Loader/>  :   <div className="shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] max-w-md md:w-[30%] w-[90%] p-6 bg-white rounded-lg ">
      
         <h2 className="text-2xl font-semibold text-center text-gray-800">Sign IN</h2>
        
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
             <h1 htmlFor="email" className="text-gray-700 mb-2">
              Email
            </h1>

            <TextField
            className='w-[100%] '
          required
          id="outlined-required"
          label="Email"
          
          type='email'
           value={email}
           onChange={handleEmailChange}
        />


          </div>
          <div className="mb-6">
            <h1 htmlFor="password" className="text-gray-700 mb-2">
              Password
            </h1>
         

             <TextField
          id="outlined-password-input"
           className='w-[100%]'
           required
          label="Password"
          type="password"
          autoComplete="current-password"
            onChange={handlePasswordChange}
        />
          </div>
          <button
            type="submit"


            className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Sign In
          </button>
        </form>

        <p className="mt-4">
            Don't have an account?{' '}
            <Link
                to="/signup"
                className="text-blue-500 hover:text-blue-600 font-semibold"
            >
                Sign Up
            </Link>
        </p>

      </div>}
    </div>
  </>
  );
};

export default Login;
