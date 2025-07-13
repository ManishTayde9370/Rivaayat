import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';

import { userReducer } from './redux/user/reducer';
import cartReducer from './redux/cart/reducer';
import wishlistReducer from './redux/wishlist/reducer';
import orderReducer from './redux/orderSlice';
import shippingReducer from './redux/shipping/reducer'; // ✅ NEW

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  wishlist: wishlistReducer,
  order: orderReducer,
  shipping: shippingReducer, // ✅ ADD TO ROOT
});

const initialState = {
  cart: {
    items: [],
  },
  wishlist: {
    items: [],
  },
  order: {
    lastOrder: null,
  },
  shipping: {
    address: null, // ✅ INITIALIZE
  },
};

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(thunk)
);

export default store;
