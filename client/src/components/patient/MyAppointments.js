import { ListItem } from '@material-ui/core';
import React from 'react'
import { useSelector } from "react-redux";
import {ListGroup,ListGroupItem} from 'reactstrap'
function MyAppointments() {
    const user = useSelector(state => state.authReducer.user)

    return (
        <div>
            <ListGroup>
                {user.appointments.reverse().map((el)=>
                <ListGroupItem><h5>The {el.appointment.slice(0,10)} at {el.appointment.slice(11,16)}</h5></ListGroupItem>
                )}
            </ListGroup>
        </div>
    )
}

export default MyAppointments
