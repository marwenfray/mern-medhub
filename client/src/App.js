import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Home from './pages/Home';
import PrivateRoute from './components/custom routes/PrivateRoute';
import Footer from './components/Footer';
import Navbar from './components/Navbar/Navbar';
import AddPatient from './components/doctor/AddPatient'
import PatientList from './components/doctor/PatientList'
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import Dashboard from './pages/Dashboard';
import Appointments from './components/doctor/Appointments'
import MyReports from './components/patient/MyReports';
import MyAppointments from './components/patient/MyAppointments';
import DoctorList from './components/admin/DoctorList';
import AddDoctor from './components/admin/AddDoctor';
function App() {
  return (
    <>
      <Router>
               <Navbar/>

        <Switch>
          <Route exact path ='/' component={Home}/>
          <PrivateRoute path='/dashboard' component={Dashboard} />
          <PrivateRoute exact path ='/addpatient' component={AddPatient}/>
          <PrivateRoute exact path ='/patients' component={PatientList}/>
          <PrivateRoute exact path ='/appointments' component={Appointments}/>
          <PrivateRoute exact path ='/myreports' component={MyReports}/>
          <PrivateRoute exact path ='/myappointments' component={MyAppointments}/>
          <PrivateRoute exact path ='/doctors' component={DoctorList}/>
          <PrivateRoute exact path ='/adddoctor' component={AddDoctor}/>
        </Switch> 

      </Router>
      <Footer/>
    </>
  );
}

export default App;
