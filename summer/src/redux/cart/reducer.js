import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  SET_CART,
} from './actions';

const initialState = [];

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const existingItem = state.find((item) => item._id === action.payload._id);

      if (existingItem) {
        return state.map((item) =>
          item._id === action.payload._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...state, { ...action.payload, quantity: 1 }];
    }

    case REMOVE_FROM_CART:
      return state.filter((item) => item._id !== action.payload);

    case CLEAR_CART:
      return [];

    case SET_CART:
      // Ensure every item from backend has a quantity
      return action.payload.map((item) => ({
        ...item,
        quantity: item.quantity || 1,
      }));

    default:
      return state;
  }
};

export default cartReducer;
