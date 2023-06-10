import { LOGIN_FAIL,LOGIN_REQUEST,LOGIN_SUCCESS,REGISTER_FAIL,REGISTER_SUCCESS,REGISTER_REQUEST,LOAD_USER_FAIL,LOAD_USER_SUCCESS,LOAD_USER_REQUEST  ,LOGOUT_FAIL,LOGOUT_SUCCESS,
    
    UPDATE_PROFILE_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_RESET,
    UPDATE_PROFILE_SUCCESS,

    
    CLEAR_ERRORS } from "../constants/userConstant";


export const userReducer = (state ={user:{}}, action) => {

    switch(action.type){
        case LOGIN_REQUEST:
        case REGISTER_REQUEST:
        case LOAD_USER_REQUEST:
            return {
            loading: true,
            isAuthenticated: false
            ,}

        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
       case LOAD_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload
            }

        case LOGOUT_SUCCESS:
            return {
                loading: false,
                isAuthenticated: false,
                user: null
            }

        case LOGIN_FAIL:
        case REGISTER_FAIL:
            return {
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
                };

        case LOGOUT_FAIL:
            return {
                ...state,
                error: action.payload,
                loading: false
            }

          case LOAD_USER_FAIL:
            
            return {
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
                };


            
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
            
        default: 
            return state
    }
}


export const updateProfileReducer = (state = {}, action) => {

    switch(action.type){

        case UPDATE_PROFILE_REQUEST:
            return {
                ...state,
                loading: true,
                
            }

        case UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }

        case UPDATE_PROFILE_RESET:
            return {
                ...state,
                isUpdated: false
            }

        case UPDATE_PROFILE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
            
        default: 
            return state
    }
}