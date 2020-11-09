const express = require('express');
const app = express();
const connectDB= require("./config/connectDB")

//port
const port= process.env.PORT || 5000;


//admin route
const adminRoute=require('./routes/admin');

//doctor route
const doctorRoute=require('./routes/doctor');

//patient route
const patientRoute= require('./routes/patient');


//middlewares

app.use(express.json());

//connecting database
connectDB()

//routes
app.use('/api/admin', adminRoute)
app.use('/api/doctor',doctorRoute);
app.use('/api/patient',patientRoute);

app.listen(port, err => {
    err? console.log(`Error occured while running the server.
    Error: ${err}`):
    console.log(`Server is running on port ${port}.`)

});