import{DOCTOR_LIST} from '../const/actionTypes'
import { getUser } from './authActions';
import { authToken } from '../authToken';
import axios from "axios";


export const doctorList=()=>async dispatch=>{
  
  if (localStorage.token) {
    authToken(localStorage.token);}

    try {let res= await axios.get("/api/admin/doctor-list")
      dispatch({type:DOCTOR_LIST,payload:res.data})
      
    } catch (error) {
      console.dir(error);
    const { errors, msg } = error.response.data;
    if (Array.isArray(errors)) {
      errors.forEach((err) => alert(err.msg));
    }
    if (msg) {
      alert(msg);
    }

    }
}

export const banDoctor=(doctorId)=>async dispatch=>{
  if (localStorage.token) {
    authToken(localStorage.token);}
    try {await axios.put(`/api/admin/ban-doctor/${doctorId}`)
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

      
    }

    
}

export const addDoctor=(username)=>async dispatch=>{
  if (localStorage.token) {
    authToken(localStorage.token);}


  try {await axios.post("/api/admin/add-doctor",{username})
    dispatch (getUser()) 
    
  } catch (error) {console.dir(error);
    const { errors, msg } = error.response.data;
    if (Array.isArray(errors)) {
      errors.forEach((err) => alert(err.msg));
    }
    if (msg) {
      alert(msg);
    }

    
  }
}
