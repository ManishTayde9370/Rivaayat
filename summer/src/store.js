import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';

import { userReducer } from './redux/user/reducer';
import cartReducer from './redux/cart/reducer';

// Combine reducers
const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
});

// Initial state (cart will load from DB after login)
const initialState = {
  cart: [],
};

// Create Redux store with middleware
const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(thunk)
);

export default store;
