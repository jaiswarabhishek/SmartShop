import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {saveShippingInfo} from '../actions/cartAction'
import {useState,useEffect} from 'react'
import MetaData from './Layout/MetaData'
import { useNavigate } from 'react-router-dom'
import { useAlert } from 'react-alert'
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle';
import PublicIcon from '@mui/icons-material/Public';
import EmojiTransportationIcon from '@mui/icons-material/EmojiTransportation';
import Checkoutstep from './Checkoutstep'




function Shipping() {
    const dispatch = useDispatch()
    const alert = useAlert()
    const navigate = useNavigate()
    const { shippingInfo } = useSelector(state => state.cart)

    const [address, setAddress] = useState(shippingInfo.address)
    const [city, setCity] = useState(shippingInfo.city)
    const [postalCode, setPostalCode] = useState(shippingInfo.postalCode)
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo)
    const [country, setCountry] = useState(shippingInfo.country)
    const [state, setState] = useState(shippingInfo.state)
   

    const shippingSubmit = (e) => {
        e.preventDefault()

        if(address==='' || city==='' || postalCode==='' || phoneNo==='' || country==='' || state===''){
            alert.error('Please fill all the fields')
            return
        }

        if(phoneNo.length!==10){
            alert.error('Please enter a valid phone number')
            return
        }

        if(postalCode.length!==6){
            alert.error('Please enter a valid postal code')
            return
        }



        dispatch(saveShippingInfo({ address, city, postalCode, phoneNo, country, state }))
        alert.success('Shipping Info Added')

        navigate('/order/confirm')


    }

  return (<>

    <MetaData title="Shipping Info" />

<Checkoutstep activeStep={0} />
    
    
    <div>
        <div className=' shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-md md:w-[40%] md:min-w-[20%] w-[90%] mx-auto text-center m-[6em] pt-2 pb-[4em] ' >

            <h1 className='text-xl p-2 m-10 border-b-2 font-medium border-black  w-1/2 text-center mx-auto'>Shipping Details</h1>

            <form
            
            onSubmit={shippingSubmit}
            >

                <div className='border-gray-200 rounded-sm p-2 border-2 w-2/3 mx-auto m-3'>  
 
                   <HomeIcon />

                    <input
                    className='p-2 ml-1 w-2/3 outline-0'
                    type="text"
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    />

                </div> 
                
                <div className='border-gray-200 rounded-sm p-2 border-2 w-2/3 mx-auto m-3'>  
                    <PersonPinCircleIcon />

                    <input
                    
                    type="number"
                    placeholder="Pin Code"
                     className='p-2 ml-1 w-2/3 outline-0'
                    value={ postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    required
                    />

                </div>
                
                <div className='border-gray-200 rounded-sm p-2 border-2 w-2/3 mx-auto m-3' >  
                     <PhoneIcon />

                    <input
                    
                    type="number"
                     className='p-2 ml-1 w-2/3 outline-0'
                    placeholder="Phone Number"
                    value={phoneNo}
                    onChange={(e) => setPhoneNo(e.target.value)}
                    required
                    />

                </div>

                {/* Country Input */}

                <div  className='border-gray-200 rounded-sm p-2 border-2 w-2/3 mx-auto m-3'>
                    <PublicIcon />

                    <input 
                     className='p-2 ml-1 w-2/3 outline-0'
                    type="text"
                    placeholder="Country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                    />

                </div>

                {/* State Input */}
                <div className='border-gray-200 rounded-sm p-2 border-2 w-2/3 mx-auto m-3' >
                    <EmojiTransportationIcon />

                    <input
                       className='p-2 ml-1 w-2/3 outline-0'
                    type="text"
                    placeholder="State"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    required
                    />

                </div>

                {/* City Input */}
                <div className='border-gray-200 rounded-sm p-2 border-2 w-2/3 mx-auto' >
                    <PersonPinCircleIcon />

                    <input
                     className='p-2 ml-1 w-2/3 outline-0'
                    type="text"
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                    />

                </div>


                <div>

                    <input type="submit"
                   
                    value="Continue"
                    className="w-2/3 m-5  cursor-pointer focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-[1em] px-5 py-4 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                    disabled={state?false:true}
                    />
                 </div>   

            </form>




        </div>
  
    </div>

    
  </>)
}

export default Shipping
