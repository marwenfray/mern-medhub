import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useSelector } from 'react-redux';


function Dashboard ()  {
    const user = useSelector((state) => state.authReducer.user);

    return (<div> <div style={{display:'flex',marginTop:'20px',marginLeft:'40%',fontFamily:'sans-serif'}}>
 <h2 style={{fontWeight:'bold'}}>Welcome   </h2>
 <h4 style={{marginLeft:'10px',marginTop:'7px'}}> {user.firstName} {user.lastName}</h4>
    </div> <hr></hr>

         <img style={{height:'600px',width:'880x',marginLeft:'20%'}} src='https://image.freepik.com/free-vector/group-medical-staff-carrying-health-related-icons_53876-43071.jpg'/>

</div>
   )
}

export default Dashboard
