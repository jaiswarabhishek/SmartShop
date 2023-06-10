import { CREATE_ORDER_FAIL,CREATE_ORDER_REQUEST,CREATE_ORDER_SUCCESS,CLEAR_ERRORS,MY_ORDERS_FAIL,MY_ORDERS_REQUEST,MY_ORDERS_SUCCESS,ORDER_DETAILS_FAIL, ORDER_DETAILS_SUCCESS,ORDER_DETAILS_REQUEST } from "../constants/orderConstant";
import axios from 'axios';
import baseUrl from "../baseUrl";


// Create new order

export const createOrder = (order) => async (dispatch,getState) => {

    try {

        dispatch({ type: CREATE_ORDER_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(`${baseUrl}/api/v1/order/new`, order,{withCredentials:true}, config,)

        dispatch({
            type: CREATE_ORDER_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: CREATE_ORDER_FAIL,
            payload: error.response.data.error
        })
    }
}


// Get currently logged in user orders

export const myOrders = () => async (dispatch) => {

    try {

        dispatch({ type: MY_ORDERS_REQUEST })

        const { data } = await axios.get(`${baseUrl}/api/v1/orders/me`,{withCredentials:true})

        dispatch({
            type: MY_ORDERS_SUCCESS,

            payload: data.orders
        })

    } catch (error) {
        dispatch({
            type: MY_ORDERS_FAIL,
            payload: error.response.data.error
        })
    }

}


// Get order details

export const getOrderDetails = (id) => async (dispatch) => {

    try {

        dispatch({ type: ORDER_DETAILS_REQUEST })

        const { data } = await axios.get(`${baseUrl}/api/v1/order/${id}`,{withCredentials:true})

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data.order
        })

    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response.data.error
        })
    }

}






// Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}

