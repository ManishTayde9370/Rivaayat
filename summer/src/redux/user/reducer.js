// redux/user/reducer.js
import { SET_USER, CLEAR_USER } from './actions';

const initialState = null;

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return action.payload;
    case CLEAR_USER:
      return initialState;
    default:
      return state;
  }
};
