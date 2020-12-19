import React from 'react'
import { useSelector } from "react-redux";
import {Card,
CardBody,
CardFooter
} from 'reactstrap'
function MyReports() {
    const user = useSelector(state => state.authReducer.user)
    
    return (<div>
        {user.reports.reverse().map((el)=>  <Card size='xl'>
        <CardBody>
{            el.report
}          </CardBody>
<CardFooter>{el.date.slice(0,10)}</CardFooter>
    </Card>)}
    </div>
    
    )
}

export default MyReports
