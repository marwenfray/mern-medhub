import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Card,
  CardBody,
  CardFooter,

  Form,
  FormGroup,
  Label,
  Input,
  ListGroup,
  ListGroupItem
} from "reactstrap";
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import { useDispatch } from "react-redux";
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";


import 'react-datetime-picker/dist/DateTimePicker.css'
import{addReport,addAppointment} from '../../js/actions/doctorActions'
const ViewPatient = ({patient}) => {
  const dispatch = useDispatch();

  const [modal, setModal] = useState(false);
  const [report,setReport]=useState('')
  const [date, setDate] = useState(new Date())

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="primary" onClick={toggle}>
        View
      </Button>
      <Modal isOpen={modal} size='xl' toggle={toggle}>
  <ModalHeader toggle={toggle}>{patient.username}</ModalHeader>
        <ModalBody>
        <Tabs defaultActiveKey="details" transition={false}>
  <Tab eventKey="details" title="Details">
    <ListGroup>
      <ListGroupItem><h5>First Name:</h5> {patient.firstName} </ListGroupItem>
      <ListGroupItem><h5>Phone Number:</h5> {patient.phoneNumber} </ListGroupItem>
      <ListGroupItem><h5>Email:</h5> {patient.email} </ListGroupItem>
    </ListGroup>
  </Tab>
  <Tab eventKey="reports" title="Reports">
<Form>
<FormGroup>
        <Label for="exampleText">New Report</Label>
        <Input type="textarea" name="text" id="exampleText" value={report}  onChange={(e)=>setReport(e.target.value)}/>
</FormGroup>
<Button color="primary" onClick={()=>dispatch(addReport(patient._id,report))}>Add</Button>
<br></br>

</Form>
<hr></hr>
    {patient.reports.reverse().map((el)=>  <Card size='xl'>
          <CardBody>
{            el.report
}          </CardBody>
<CardFooter>{el.date.slice(0,10)}</CardFooter>
      </Card>)}
  </Tab>
  <Tab eventKey="appointments" title="Appointments" >
    <Form>
      <FormGroup>
      <Label for="exampleText">Add Appointment</Label>
<Datetime dateFormat="dddd, MMMM Do YYYY, h:mm:ss a" value={date} onChange={setDate} />
<Button color="primary" onClick={()=>dispatch(addAppointment(patient._id,date))}>Add</Button>

</FormGroup>
<br></br>
</Form>
<hr></hr>
<ListGroup>
  {patient.appointments.reverse().map((el)=>
  <ListGroupItem><h5> {el.appointment.slice(0,10)} {el.appointment.slice(11,16)}</h5> </ListGroupItem>
  )}
</ListGroup>

  </Tab>
</Tabs>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ViewPatient;