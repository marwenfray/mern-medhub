const router = require('express').Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require("config");
const isAuth = require ('../middlewares/isAuthAdmin')

const Admin = require ("../models/Admin")
const Doctor = require("../models/Doctor")


router.post('/',async (req, res) => {
    const{email,password}= req.body
    try { let admin = await Admin.findOne({email})
    if (!admin) { 
       
        return res.status(400).send({msg: "bad creadentials"})
   
}
    
    const isMatch = await bcrypt.compare(password, admin.password) 
    if (!isMatch){
        return res.status(400).send({msg: "bad creadentials"})
    }  
    const payload={
        _id:admin._id
    };
    const token = await jwt.sign(payload,config.get("secret") );

    res.send({msg:'signin successful', admin,token});

    } catch (error) {
        res.status(500).send({ msg: "Server error" })

    }
});

router.post('/addAdmin', isAuth, async (req, res) => {
    const{email,password}= req.body
    try {let admin = await Admin.findOne({email})
    admin? res.status(400).send({msg: "email already exists"}):
    admin= new Admin({
        email,
        password
    })
    const salt=10;
    const hashed= await bcrypt.hash(password, salt);
    admin.password= hashed;
    await admin.save()
    res.status(200).send({msg:"user saved", admin})    
    } catch (error) {
        res.status(500).send(error)
    }
});

router.post('/add-doctor',isAuth,async (req, res) => {
    const {username}=req.body 	
    const admin = req.admin
    try { let doc= await Admin.findOne({usernames:{$in:[username]}})
          doc?res.status(400).send({msg: "username already exists"}):
           admin.usernames.push(username);
          admin.save()
          res.send({usernames:req.admin.usernames})
    } catch (error) {
        res.status(500).send(error)
        
    }
});

router.put('/ban-doctor/:_id',isAuth, async (req, res) => {

      const _id = req.params._id
   try {
        let doctor = await Doctor.findById(_id)
        if (!doctor) {res.status(400).send({msg: "doctor doesn't exist"});}
        doctor.active=false
        doctor.save()
        res.send(doctor)

   } catch (error) {
    res.status(500).send(error)
   }
});

router.get('/doctor-list',isAuth,async (req, res) => {
     try {let doctor = await Doctor.find({})
        !doctor? res.status(400).send({msg:'the list is empty'}):
         res.send(doctor)
     } catch (error) {
        res.status(500).send(error)
     }
});
module.exports = router;