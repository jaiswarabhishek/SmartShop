import axios from "axios";
import { ALL_PRODUCTS_FAIL,ALL_PRODUCTS_REQUEST,ALL_PRODUCTS_SUCCESS,PRODUCT_DETAILS_FAIL,PRODUCT_DETAILS_SUCCESS,PRODUCT_DETAILS_REQUEST,CLEAR_ERRORS } from "../constants/productConstant";
import baseUrl from "../baseUrl";

export const getProducts = () => async (dispatch) => {

    try {
dispatch({type:ALL_PRODUCTS_REQUEST})

        const { data } = await axios.get(`${baseUrl}/api/v1/products`)
       

        dispatch({
            type: ALL_PRODUCTS_SUCCESS,
            payload: data
        })
        

    } catch (error) {
        dispatch({
            type: ALL_PRODUCTS_FAIL,
            payload: error.response.data.message
        })
    }
}

// Get product details
export const getProductDetails = (id) => async (dispatch) => {
    try {

        dispatch({ type: PRODUCT_DETAILS_REQUEST })

        const { data } = await axios.get(`${baseUrl}/api/v1/products/${id}`)
        console.log(data)
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data.product
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}


// Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}
