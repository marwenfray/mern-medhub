const express = require('express');
const app = express();
const connectDB= require("./config/connectDB")
const cors = require('cors');
//port
const port= process.env.PORT || 5000;

//auth route
const authRoute= require("./routes/auth")

//admin route
const adminRoute=require('./routes/admin');

//doctor route
const doctorRoute=require('./routes/doctor');

//patient route


//middlewares

app.use(express.json());
app.use(cors());
//connecting database
connectDB()

//routes
app.use('/api/auth',authRoute)
app.use('/api/admin', adminRoute)
app.use('/api/doctor',doctorRoute);

app.listen(port, err => {
    err? console.log(`Error occured while running the server.
    Error: ${err}`):
    console.log(`Server is running on port ${port}.`)

});