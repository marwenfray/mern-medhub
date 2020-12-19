import {
  SIGNIN,
  SIGNUP,
  LOGOUT,
  GET_AUTH_USER,
  SET_LOADING,
  AUTH_ERROR
} from "../const/actionTypes";

const initState = {
  token: localStorage.getItem("token"),
  user: {},
  isAuth: false,
  isLoading: false,
  msg:null,
};
export default function authReducer(state = initState, { type, payload }){
  switch (type) {
    case SET_LOADING:
      return { ...state, isLoading: true };
    case LOGOUT:
    case AUTH_ERROR:
      localStorage.removeItem("token");
      return { ...state, user: {}, token: null, isAuth: false };
    case SIGNIN:
    case SIGNUP:
      localStorage.setItem("token", payload.token);
      return { ...state, isLoading: false, isAuth: true, ...payload };
    case GET_AUTH_USER:
      return { ...state, isLoading: false, isAuth: true,...payload };
    default:
      return state;
  }
}
