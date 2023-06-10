import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import Logins from '../../assets/loginss.png'
import { useSelector,useDispatch } from 'react-redux'
import { login,clearErrors,register } from '../../actions/userAction'
import { useEffect } from 'react';
import {useAlert} from 'react-alert'
import Loader from '../Layout/loader'
import {useNavigate} from "react-router-dom"



const Signup = () => {

  const dispatch = useDispatch()
  const alert = useAlert()
    const navigate = useNavigate();

    const {isAuthenticated,error,loading , user } = useSelector(state => state.user)

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 const [avatar, setAvatar] = useState("/Profile.png");
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  console.log(name)

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleImageChange = (e) => {


    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
        setAvatarPreview(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
 

   

  };  






  const handleSubmit = (e) => {
    e.preventDefault();


    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('avatar', avatar    );
   
    
 

    dispatch(register(formData))
   

  };


  useEffect(() => {
    if(error){
      alert.error(error)
      dispatch(clearErrors())
    }

    if(isAuthenticated){

      navigate('/account')
    }



  }, [dispatch,error, alert,isAuthenticated, navigate])

 



  return (
    <div className="flex flex-col items-center justify-center   bg-gray-100">
      <div className="shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] max-w-md md:w-[50%] w-[90%] px-6 py-8 m-10 bg-white   rounded-md">
          <h2 className="text-2xl font-semibold text-center text-gray-800">Sign Up</h2>
          {/* form ecryption */}
        <form  enctype="multipart/form-data"    onSubmit={handleSubmit} className=" ">
          <div>
           
              <h1 htmlFor="name" className="text-gray-700 mb-2">
              Name
            </h1>

            <TextField
            className='w-[100%] '
             required
             id="outlined-required"
             label="Name"
            type='text'
            value={name}
            onChange={handleNameChange}
            />


          </div>

          <div className="mt-4">
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

          <div className="mt-4">
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
          <div className="mt-4">
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
              Profile Image
            </label>
            <input
              type="file"
              id="avatar"
              name="avatar"
              accept="images/*"
              onChange={handleImageChange}
              className="mt-1 block"
            />
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign up
            </button>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <p className="mt-4">
            Already have an account?{' '}
            <Link
                to="/login"
                className="text-blue-500 hover:text-blue-600 font-semibold"
            >
                Sign In
            </Link>
        </p>
          </div>



        </form>

       
      </div>
    </div>
  );
};

export default Signup;
