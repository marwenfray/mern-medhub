const router = require('express').Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require("config");
const User =require('../models/User')
const {signupRules,validator}= require("../middlewares/bodyValidator")
const isAuth = require ('../middlewares/isAuth')




router.post('/add-patient', isAuth, async (req, res) => {
  const {username,email,phoneNumber,password,firstName,lastName}=req.body
  const user = req.user
  try
  {
    if(user.userType!=="doctor") {res.status(401).send("Unauthorized")}
  let patient= await User.findOne({email})
  patient?res.status(400).send({msg: "email already exists"}):
  await User.findOne({username})?
  res.status(400).send({msg: "username already exists"}):
  patient= new User(
    {doctorUsername:user.username,
        username,
        email,
        phoneNumber,
        password,
        firstName,
        lastName,
        userType:"patient"
    }
  )
  const salt=10;
    const hashed= await bcrypt.hash(password, salt);
    patient.password= hashed;
    await patient.save()
    res.status(200).send({msg:"patient saved", patient})

}
catch(error) {
    res.status(500).send(error)
    
}	
});

router.get('/patient-list', isAuth, async(req, res) => {
    const doctor = req.body
    const doctorUsername=doctor.username
try {let patient = await Patient.find(doctorUsername)
       !patient? res.status(400).send({msg:'the list is empty'}):
       res.send(patient)


    
} catch (error) {
    res.status(500).send(error)
} 	
});

router.post('/add-report/:_id',isAuth, async (req, res) => {
const user =req.user    
const {report}=req.body
const {_id}= req.params
const date=`${new Date().getMonth()+1}-${new Date().getDate()}-${new Date().getFullYear()}`
const newReport={report,date}
try {
    console.log(date)
    if(user.userType!=="doctor") {res.status(401).send("Unauthorized")}
    let patient = await User.findById(_id)
    !patient? res.status(400).send({msg:"patient cannot be found"}):
    await patient.reports.push(newReport);
    patient.save()
    res.status(200).send({msg:"report added successfully",patient})    
} catch (error) {
    res.status(500).send(error)  
}
});


router.post('/add-appointment/:_id',isAuth, async (req, res) => {
    const doctor =req.user
const {appointment}=req.body
const {_id}= req.params
try {
    if(doctor.userType!=="doctor") {res.status(401).send("Unauthorized")}
    let user = await User.findById(_id)
    !user? res.status(400).send({msg:"patient cannot be found"}):
    await user.appointments.push(appointment);
    user.save()
    res.status(200).send({msg:"appointment added successfully",appointments:user.appointments})    
} catch (error) {
    res.status(500).send(error)  
}
});




module.exports = router;