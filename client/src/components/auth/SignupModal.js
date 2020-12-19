import React, { useState } from "react";
import { connect } from 'react-redux';

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { signup } from "../../js/actions/authActions";

const SignupModal = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [FormData, setFormData] = useState({
    username:"",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber:"",
    password: "",

  });

  const handleFormChange = (e) =>
    setFormData({ ...FormData, [e.target.name]: e.target.value });

  const handleConfirm = () => {
    dispatch(signup(FormData));
    history.push('/dashboard')
   
  };

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="primary" onClick={toggle}>
        Signup
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Signup</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="name">Username</Label>
              <Input
                onChange={handleFormChange}
                type="text"
                name="username"
                id="username"
                placeholder="Enter your username ...."
              />
          
            </FormGroup>
            <FormGroup>
              <Label for="name">First Name</Label>
              <Input
                onChange={handleFormChange}
                type="text"
                name="firstName"
                id="firstName"
                placeholder="Enter your name ...."
              />
            </FormGroup>
            <FormGroup>
              <Label for="lastName">Last Name</Label>
              <Input
                onChange={handleFormChange}
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Enter your last name ...."
              />
            </FormGroup>
            <FormGroup>
              <Label for="exampleEmail">Email</Label>
              <Input
                onChange={handleFormChange}
                type="email"
                name="email"
                id="exampleEmail"
                placeholder="Enter your Email..."
              />
            </FormGroup>
            <FormGroup>
              <Label for="exampleEmail">Phone Number</Label>
              <Input
                onChange={handleFormChange}
                type="number"
                name="phoneNumber"
                id="phoneNumber"
                placeholder="Enter your Phone number..."
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">password</Label>
              <Input
                onChange={handleFormChange}
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password..."
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              handleConfirm();
              toggle();
            }}
          >
            Confirm
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default SignupModal;