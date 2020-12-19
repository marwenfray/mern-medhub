import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { MDBDataTable } from 'mdbreact';
import {Button} from 'reactstrap'
import{banDoctor} from '../../js/actions/adminActions'
function DoctorList() {
    const dispatch=useDispatch()
    const doctors = useSelector(state => state.adminReducer.doctors)
    let rowData = doctors.map((el,i)=>el={...el,active:`${el.active}`,ban:<Button onClick={()=>dispatch(banDoctor(el._id))} color="danger" key={i}>Ban/Unban</Button>})
    const data = {
        columns: [
          {
            label: 'Username',
            field: 'username',
            sort: 'asc',
            width: 100
          },
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
            width: 50
          },
          {
            label: 'Email',
            field: 'email',
            sort: 'asc',
            width: 50
          },
          {
            label: 'Active',
            field: 'active',
            sort: 'asc',
            width: 100
          },
          {
              label:'Ban/Unban',
              field:'ban',
              width:50
          }
        ],
        rows: 
          
            rowData
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

export default DoctorList
