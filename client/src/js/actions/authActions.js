import axios from "axios";

import {
    SIGNIN,
    SIGNUP,
    AUTH_ERROR,
    LOGOUT,
    GET_AUTH_USER,
    SET_LOADING,
    
  } from "../const/actionTypes";
  import { authToken } from '../authToken';
import {patientList} from './doctorActions'
  import {doctorList} from './adminActions'

export const signup =( FormData )=> async dispatch =>{
    dispatch(setLoading())
    try {
        let res= await axios.post("/api/auth/signup",FormData)
        
        dispatch({
            type:SIGNUP,
            payload:res.data
        })
    } catch (error) {
      console.dir(error);
      const { errors, msg } = error.response.data;
      if (Array.isArray(errors)) {
        errors.forEach((err) => alert(err.msg));
      }
      if (msg) {
        alert(msg);
      }
          dispatch({
          type: AUTH_ERROR,
        });
        
    }

}
export const signin =( FormData )=> async dispatch =>{
    dispatch(setLoading())
    try {
        let res= await axios.post("/api/auth/signin",FormData)
        
      dispatch(
         {
         type:SIGNIN,
         payload:res.data
     })
     dispatch(patientList())
     dispatch(doctorList())
    } catch (error) {
      console.dir(error);
      const { errors, msg } = error.response.data;
      if (Array.isArray(errors)) {
        errors.forEach((err) => alert(err.msg));
      }
      if (msg) {
        alert(msg);
      }
  

    dispatch({
      type: AUTH_ERROR,
    });     
    }

}

export const getUser=()=>async dispatch =>{
    
    if (localStorage.token) {
        authToken(localStorage.token);
      }
 try {
    
     let res= await axios.get("/api/auth/user")
     dispatch({
         type:GET_AUTH_USER,
         payload:res.data  
     })
 } catch (error) {console.dir(error);
  const { errors, msg } = error.response.data;
  if (Array.isArray(errors)) {
    errors.forEach((err) => alert(err.msg));
  }
  if (msg) {
    alert(msg);
  }

    dispatch({
        type:AUTH_ERROR
    })
     
 }

}
export const setLoading =()=> dispatch =>{
    dispatch({
        type : SET_LOADING
    })

}

export const logout = () => (dispatch) => {
    dispatch({
      type: LOGOUT,
    });
  };