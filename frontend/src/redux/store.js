import { createStore, applyMiddleware,combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productsReducer,productUpdateReducer,productDetailsReducer,newReviewReducer,adminProductsReducer,newProductReducer,productReducer} from '../reducer/productsReducer';
import { userReducer,updateProfileReducer } from '../reducer/userReducer';
import { cartReducer } from '../reducer/cartReducer';
import {newOrderReducer,myOrdersReducer,orderDetailsReducer} from '../reducer/orderReducer';

const reducer = combineReducers({
    // reducers
    products: productsReducer,
    productDetails: productDetailsReducer,
    adminProducts: adminProductsReducer,
    productUpdate: productUpdateReducer,
    newReview: newReviewReducer,
    product: productReducer,
    user: userReducer,
    updateProfile: updateProfileReducer,
    cart: cartReducer,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    orderDetails: orderDetailsReducer,
    newProduct: newProductReducer
});

const initialState = {

    cart:{
        cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
        shippingInfo: localStorage.getItem('shippingInfo') ? JSON.parse(localStorage.getItem('shippingInfo')) : {}
        
    }


};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

