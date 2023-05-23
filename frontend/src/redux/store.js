import { createStore, applyMiddleware,combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productsReducer,productDetailsReducer } from '../reducer/productsReducer';

const reducer = combineReducers({
    // reducers
    products: productsReducer,
    productDetails: productDetailsReducer
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

