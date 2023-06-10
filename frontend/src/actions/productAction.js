import axios from "axios";
import { ALL_PRODUCTS_FAIL,ALL_PRODUCTS_REQUEST,ALL_PRODUCTS_SUCCESS,PRODUCT_DETAILS_FAIL,PRODUCT_DETAILS_SUCCESS,PRODUCT_DETAILS_REQUEST,CLEAR_ERRORS , NEW_REVIEW_FAIL,NEW_REVIEW_REQUEST,NEW_REVIEW_SUCCESS,NEW_REVIEW_RESET,ADMIN_PRODUCTS_FAIL,ADMIN_PRODUCTS_REQUEST,ADMIN_PRODUCTS_SUCCESS, NEW_PRODUCT_FAIL,NEW_PRODUCT_REQUEST,NEW_PRODUCT_RESET,NEW_PRODUCT_SUCCESS,DELETE_PRODUCT_FAIL,DELETE_PRODUCT_REQUEST,DELETE_PRODUCT_RESET,DELETE_PRODUCT_SUCCESS ,UPDATE_PRODUCT_FAIL,UPDATE_PRODUCT_REQUEST,UPDATE_PRODUCT_RESET,UPDATE_PRODUCT_SUCCESS} from "../constants/productConstant";
import baseUrl from "../baseUrl";
import { radioClasses } from "@mui/material";

export const getProducts = ( keyword="", page=1,price=[1,500], category="",ratings=0) => async (dispatch) => {

    try {
dispatch({type:ALL_PRODUCTS_REQUEST})

        
     
        const { data } = await axios.get(`${baseUrl}/api/v1/products?keyword=${keyword}&page=${page}&priceMax=${price[1]}&priceMin=${price[0]}&category=${category}&ratingMin=${ratings}`)

   
    
    
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
       
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}


// New review

export const newReview = (reviewData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_REVIEW_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`${baseUrl}/api/v1/review`, reviewData, {withCredentials:true}, config)

        dispatch({
            type: NEW_REVIEW_SUCCESS,
            payload: data.message
        })

    } catch (error) {
        dispatch({
            type: NEW_REVIEW_FAIL,
            payload: error.response.data.message
        })

    }
}

// Get Admin Products
export const getAdminProducts = () => async (dispatch) => {
    try {

        dispatch({ type: ADMIN_PRODUCTS_REQUEST })

        const { data } = await axios.get(`${baseUrl}/api/v1/admin/products`,{withCredentials:true})
        console.log(data)
        dispatch({
            type: ADMIN_PRODUCTS_SUCCESS,
            payload: data.products
        })

    } catch (error) {
        dispatch({
            type: ADMIN_PRODUCTS_FAIL,
            payload: error.response.data.message
        })
    }
}


// New Product

export const newProduct = (productData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_PRODUCT_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        console.log(productData)
        const { data } = await axios.post(`${baseUrl}/api/v1/admin/product/new`, productData, {withCredentials:true}, config)

        dispatch({
            type: NEW_PRODUCT_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_PRODUCT_FAIL,
            payload: error.response.data.message
        })

    }
}


// Delete product (Admin)
export const deleteProduct = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_PRODUCT_REQUEST })

        const { data } = await axios.delete(`${baseUrl}/api/v1/admin/products/${id}`,{withCredentials:true})

        dispatch({
            type: DELETE_PRODUCT_SUCCESS,
            payload: data.message
        })

    } catch (error) {
        dispatch({
            type: DELETE_PRODUCT_FAIL,
            payload: error.response.data.message
        })

    }
}


// Update product (Admin)

export const updateProduct = (id, productData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_PRODUCT_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        console.log(productData)

        const { data } = await axios.put(`${baseUrl}/api/v1/admin/products/${id}`, productData, {withCredentials:true}, config)

        dispatch({
            type: UPDATE_PRODUCT_SUCCESS,
            payload: data.message
        })

    } catch (error) {
        dispatch({
            type: UPDATE_PRODUCT_FAIL,
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
