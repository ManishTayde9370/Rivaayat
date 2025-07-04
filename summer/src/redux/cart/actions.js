import axios from 'axios';
import { serverEndpoint } from '../../components/config';

// Action Types
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const CLEAR_CART = 'CLEAR_CART';
export const SET_CART = 'SET_CART';

// Action Creators
export const addToCart = (product) => ({
  type: ADD_TO_CART,
  payload: product,
});

export const removeFromCart = (productId) => ({
  type: REMOVE_FROM_CART,
  payload: productId,
});

export const clearCart = () => ({
  type: CLEAR_CART,
});

export const setCart = (cartItems) => ({
  type: SET_CART,
  payload: cartItems,
});

// Thunk: Save cart to backend (MongoDB)
export const saveCartToBackend = (cartItems) => async (dispatch) => {
  try {
    await axios.post(
      `${serverEndpoint}/api/cart/save`,
      { cartItems },
      { withCredentials: true }
    );
    console.log('✅ Cart saved to backend');
  } catch (err) {
    console.error('❌ Failed to save cart to backend:', err);
  }
};

// Thunk: Load cart from backend after login
export const loadCartFromBackend = () => async (dispatch) => {
  try {
    const res = await axios.get(`${serverEndpoint}/api/cart/user`, {
      withCredentials: true,
    });

    const cartItems = res.data.items || [];
    dispatch(setCart(cartItems));
  } catch (err) {
    console.warn('⚠️ Could not load cart:', err);
  }
};
