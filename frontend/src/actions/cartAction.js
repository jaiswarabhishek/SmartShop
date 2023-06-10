import { ADD_TO_CART,REMOVE_FROM_CART,SHIPPING_INFO } from "../constants/cartConstant";
import axios from "axios";
import baseUrl from "../baseUrl";

// Add to cart action

export const addToCart = (id, quantity) => async (dispatch, getState) => {

    try{
        
         

            const { data } = await axios.get(`${baseUrl}/api/v1/products/${id}`)

            console.log(data)
            
    
            dispatch({
                type: ADD_TO_CART,
                payload: {
                    product: data._id,
                    name: data.name,
                    price: data.price,
                    image: data.images[0].url,
                    stock: data.quantity,
                    quantity
                }
            })
    
        
    
            localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
    }
    catch(err){
        console.log(err)
    }


}

// Remove from cart action

export const removeFromCart = (id) => async (dispatch, getState) => {
    
        dispatch({
            type: REMOVE_FROM_CART,
            payload: id
        })
    
        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
    
    }

    // Shipping info

    export const saveShippingInfo = (data)=> async(dispatch)=>{

         dispatch(
            {
                type:SHIPPING_INFO,
                payload:data,
            }
         )

         localStorage.setItem("shippingInfo",JSON.stringify(data));

    }














