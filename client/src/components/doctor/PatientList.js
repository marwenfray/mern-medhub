import React from 'react'
import { useSelector } from "react-redux";
import { MDBDataTable } from 'mdbreact';

import ViewPatient from "./ViewPatient"


function PatientList() { 
       const patients = useSelector(state => state.doctorReducer.patients)
     let patient = patients.map((el,i)=>el={...el,View:<ViewPatient key={i} patient={el}/>})
     
    const data = {
        columns: [
          {
            label: 'First Name',
            field: 'firstName',
            sort: 'asc',
            width: 100
          },
          {
            label: 'Last Name',
            field: 'lastName',
            sort: 'asc',
            width: 100
          },
          {
            label: 'Phone Number',
            field: 'phoneNumber',
            sort: 'asc',
            width: 100
          },
          {
            label: 'Email',
            field: 'email',
            sort: 'asc',
            width: 100
          },
          {
              label:'View',
              field:'View',
              width:50
          }
        ],
        rows: 
          
            patient
          }

    return (
        <MDBDataTable
        striped
        bordered
        small
        data={data}
      />
      )
}

export default PatientList
