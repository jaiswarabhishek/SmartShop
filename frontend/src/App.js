import './App.css';
import Header from './components/Layout/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/Layout/Footer';
import Home from './components/Home';
import ProductDetails from './components/ProductDetails';
import Allproducts from './components/Allproducts';
import Search from './components/Layout/Search';
import Login from './components/User/login';
import Signup from './components/User/signup';
import { useEffect,useState } from 'react';
import {useDispatch} from 'react-redux'
import {loadUser} from './actions/userAction'
import store from './redux/store'
import { useSelector } from 'react-redux';
import Account from './components/User/account';
import UserUpdateProfile from './components/User/UserUpdateProfile';
import Cart from './components/Cart';
import Shipping from './components/Shipping';
import Confirmorder from './components/Confirmorder';
import axios from 'axios';
import baseUrl from './baseUrl';
import Payment from './components/Payment';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Successorder from './components/Successorder';
import Myorder from './components/Order/Myorder';
import Orderdetails from './components/Order/Orderdetails';
import Dashboard from './components/Admin/Dashboard';
import Productlist from './components/Admin/Productlist';
import Newproduct from './components/Admin/Newproduct';
import Updateproduct from './components/Admin/Updateproduct';

function App() {

  
const {isAuthenticated,user,loading  } = useSelector(state => state.user)

const [stripeApiKey,setStripeApiKey] = useState('')

async function getStripeApiKey(){
  const {data} = await axios.get(`${baseUrl}/api/v1/stripeapi`,{withCredentials:true })


  setStripeApiKey(data.stripeApiKey)
 
}


  useEffect(() => {
    store.dispatch(loadUser())

    
    getStripeApiKey()

  }, [])
 
  return (
    <div classname="">
       <Router>
         <Header  isAuthenticated={isAuthenticated}  user={user} />

         


          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/product/:id" element={<ProductDetails/>}/>
            <Route path="/products" element={<Allproducts/>}/>
            <Route path="/search" element={<Search/>}/>
            <Route path="/login" element={<Login/>}/>
            
            <Route path="/signup" element={<Signup/>}/>

          { 
          isAuthenticated &&  <Route path="/account" element={<Account/>}/>
          }
            {
              isAuthenticated && <Route path="/me/update" element={<UserUpdateProfile  user={user}  />}/>
            }

            <Route path="/cart" element={<Cart/>}/>

            {
              isAuthenticated && <Route path="/shipping" element={< Shipping />}  />
            }

            {
              isAuthenticated && <Route path="/order/confirm" element={<Confirmorder/>}/>
            }


            {

              isAuthenticated && 

              <Route path="/payment" element={<Elements stripe={loadStripe(stripeApiKey)}><Payment stripeApiKey={stripeApiKey}/></Elements>}/>
            }

            {
              isAuthenticated && <Route path="/success" element={<Successorder/>}/>
            }

            {
              isAuthenticated && <Route path="/orders" element={<Myorder/>}/>
            }

            {
              isAuthenticated && <Route path="/orders/:id" element={<Orderdetails/>}/>
            }

            {
              isAuthenticated && user.role === 'admin' && <Route path="/dashboard" element={<Dashboard/>}/>
            }

            {
              isAuthenticated && user.role === 'admin' && <Route path="/admin/products" element={<Productlist/>}/>
            }

            {
              isAuthenticated && user.role === 'admin' && <Route path="/admin/product" element={<Newproduct/>}/>
            }

            {
              isAuthenticated && user.role === 'admin' && <Route path="/admin/product/:id" element={<Updateproduct/>}/>
            }


          </Routes>
        <Footer/>
       </Router>

    </div>
  );
}

export default App