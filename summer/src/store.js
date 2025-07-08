import { createStore, combineReducers, applyMiddleware } from 'redux';

import { thunk } from 'redux-thunk';


import { userReducer } from './redux/user/reducer';
import cartReducer from './redux/cart/reducer';
import wishlistReducer from './redux/wishlist/reducer'; // ✅ add this

// Combine reducers
const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  wishlist: wishlistReducer, // ✅ include wishlist reducer
});

// Optional: Initial state (not needed if reducers handle default state)
const initialState = {
  cart: {
    items: [], // ✅ proper shape
  },
  wishlist: {
    items: [], // ✅ ensure it matches reducer default
  },
};

// Create Redux store with middleware
const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(thunk)
);

export default store;
