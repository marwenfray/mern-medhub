import React from 'react'
import { useSelector } from "react-redux";
import { MDBDataTable } from 'mdbreact';



function Appointments() { 
       const patients = useSelector(state => state.doctorReducer.patients)
       const appointments = patients.map((el)=>el=[...el.appointments])
       let merged = [].concat.apply([],appointments)
       let appointment=merged.map((el)=>el={appointment:`The ${el.appointment.slice(0,10)} at ${el.appointment.slice(11,16)}`,name:el.name})
    const data = {
        columns: [
          {
            label: 'Appointments',
            field: 'appointment',
            sort: 'asc',
            width: 100
          },
          {
            label: 'Name',
            field: 'name',
            sort: 'asc',
            width: 100
          },
         
        ],
        rows: appointment
            
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

export default Appointments