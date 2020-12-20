import { REMOVE_ALERT, SHOW_ALERT } from "../const/actionTypes";

const INITIAL_STATE = [];

export const alertReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case SHOW_ALERT:
      return [...state, payload];
    case REMOVE_ALERT:
      return state.filter(alert => alert.id !== payload);
    default:
      return state;
  }
}