const router = require('express').Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require("config");
const Doctor =require('../models/Doctor')
const Patient = require("../models/Patient")
const {signupRules, signinRules,validator}= require("../middlewares/bodyValidator")
const isAuth = require ('../middlewares/isAuthDoc')
const Admin = require("../models/Admin")


router.post('/signup',signupRules(), validator, async (req, res) => {
const {username, email,phoneNumber,password,firstName,lastName} = req.body;
try {
     let authorization = await Admin.findOne({usernames:{$in:[username]}})
     !authorization?  res.status(400).send({msg: "username invalid"}):

    await Doctor.findOne({email})?
     res.status(400).send({msg: "email already exists"}):
    await Doctor.findOne({phoneNumber})?
    res.status(400).send({msg: "phone number already exists"}):
    doctor= new Doctor({
         username,
         email,
         phoneNumber,
         password,
         firstName,
         lastName

    })
    const salt=10;
    const hashed= await bcrypt.hash(password, salt);
    doctor.password= hashed;
    await doctor.save()
    res.status(200).send({msg:"user saved", doctor})
} catch (error) {
    res.status(500).send(error)
    
}	
});


router.post('/signin', async (req, res) => {
 const{email,password}= req.body
try {
    const doctor =await Doctor.findOne({email})
   if (!doctor) { 
       
            return res.status(400).send({msg: "bad creadentials"})
       
    }
   
    
    const isMatch = await bcrypt.compare(password, doctor.password)  
    if (!isMatch){
        return res.status(400).send({msg: "bad creadentials"})
    }  

 const payload={
        _id:doctor._id
    };
    const token = await jwt.sign(payload,config.get("secret") );

    res.send({msg:'signin successful', doctor,token});

   
} catch (error) {
    res.status(500).send({ msg: "Server error" })
}

});


router.post('/add-patient', isAuth, async (req, res) => {
  const {username,email,phoneNumber,password,firstName,lastName}=req.body
  const doctor = req.doctor
  try
  {let patient= await Patient.findOne({email})
  patient?res.status(400).send({msg: "email already exists"}):
  await Patient.findOne({phoneNumber})?
  res.status(400).send({msg: "phone number already exists"}):
  await Patient.findOne({username})?
  res.status(400).send({msg: "username already exists"}):
  patient= new Patient(
    {doctorUsername:doctor.username,
        username,
        email,
        phoneNumber,
        password,
        firstName,
        lastName}
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

router.post('/add-appointment/:_id',isAuth, async (req, res) => {
const {appointment}=req.body
const _id= req.params._id
try {let patient = await Patient.findById(_id)
    !patient? res.status(400).send({msg:"patient cannot be found"}):
    await patient.appointments.push(appointment);
    patient.save()
    res.status(200).send({msg:"appointment added successfully",patient})    
} catch (error) {
    res.status(500).send(error)  
}
});




module.exports = router;