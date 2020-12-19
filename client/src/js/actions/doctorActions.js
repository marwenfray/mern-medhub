import axios from "axios"

import{PATIENT_LIST,ADD_PATIENT} from '../const/actionTypes'
import { authToken } from '../authToken';

export const patientList=()=>async dispatch=>{
  if (localStorage.token) {
    authToken(localStorage.token);
  }
try {let res= await axios.get('api/doctor/patient-list')
dispatch({
  type:PATIENT_LIST,
  payload:res.data

})
  
} catch (error) {alert(error)
  
}
}



export const addPatient =(FormData)=> async dispatch=>{
  if (localStorage.token) {
    authToken(localStorage.token);
  }
  
    try {
      let res = await axios.post("/api/doctor/add-patient",FormData)
    await dispatch({
      type:ADD_PATIENT,
      payload:res.data
    })
    dispatch(
      patientList()
    )
      
    } catch (error) {alert(error)
  
      
    }
    
}
export const addAppointment =(patientId,date)=>async dispatch=>{
  if (localStorage.token) {
    authToken(localStorage.token);
  }
    try {await axios.post(`/api/doctor/add-appointment/${patientId}`,{appointment:date})
        dispatch(patientList())

    } catch (error) {alert(error)
      
    }
}
export const addReport =(patientId,report)=>async dispatch=>{
  if (localStorage.token) {
    authToken(localStorage.token);
  }
  
  try {await axios.post(`/api/doctor/add-report/${patientId}`,{report:report})
  dispatch(patientList())
    
  } catch (error) {alert(error)

    
  }
    
    
    
}
