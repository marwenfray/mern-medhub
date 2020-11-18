const router = require('express').Router();
const Patient = require('../models/Patient');
const isAuth = require('../middlewares/isAuthPatient')

router.post('/signin', async (req, res) => {
    const{email,password}= req.body
   try {
       const patient =await Patient.findOne({email})
      if (!patient) { 
          
               return res.status(400).send({msg: "bad creadentials"})
          
       }
      
       
       const isMatch = await bcrypt.compare(password, patient.password)  
       if (!isMatch){
           return res.status(400).send({msg: "bad creadentials"})
       }  
   
    const payload={
           _id:patient._id
       };
       const token = await jwt.sign(payload,config.get("secret") );
   
       res.send({msg:'signin successful', patient,token});
   
      
   } catch (error) {
       res.status(500).send({ msg: "Server error" })
   }
   
   });
   

   router.get('/auth',isAuth, (req, res) => {
    res.status(200).send({patient:req.patient});
   });



module.exports = router;