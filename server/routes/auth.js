const router = require('express').Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require("config");
const User = require('../models/User');
const isAuth = require ('../middlewares/isAuth')
const {signinRules,signupRules,validator} = require('../middlewares/bodyValidator')



router.post('/signin',signinRules(),validator, async (req, res) => {
    const{email,password}= req.body
   try {

       const user =await User.findOne({email})
      if (!user) { 
          
               return res.status(400).send({msg: "Bad creadentials"})
          
       }
      
       
       const isMatch = await bcrypt.compare(password, user.password)  
       if (!isMatch){
           return res.status(400).send({msg: "Bad creadentials"})
       }  

   
   
    const payload={
           _id:user._id
       };
       const token = await jwt.sign(payload,config.get("secret") );
       if (!user.active){
        res.status(401).send({msg:"Unauthorized, check with admin"})
    }
       res.send({msg:'signin successful', user:userSecure(user),token});
   
      
   } catch (error) {
       console.log(error)
       res.status(500).send({ msg: "Server error" })
   }
   
   });

   router.post('/signup',signupRules(), validator, async (req, res) => {
    const {username, email,phoneNumber,password,firstName,lastName} = req.body;
    try {
         let authorization = await User.findOne({usernames:{$in:[username]}})
         !authorization?  res.status(400).send({msg: "username invalid"}):
        await User.findOne({username})?
         res.status(400).send({msg: "username already exists"}):
        await User.findOne({email})?
         res.status(400).send({msg: "Email already exists"}):
        await User.findOne({phoneNumber})?
        res.status(400).send({msg: "Phone number already exists"}):
        user= new User({
             username,
             email,
             phoneNumber,
             password,
             firstName,
             lastName,
             userType:"doctor"
    
        })
        const salt=10;
        const hashed= await bcrypt.hash(password, salt);
        user.password= hashed;
        await user.save()
        res.status(200).send({msg:"user saved", user})
        const payload={
            _id:user._id
        };
        const token = await jwt.sign(payload,config.get("secret") );
    
        res.send({msg:'signin successful', user:userSecure(user),token});
    
    } catch (error) {
        res.status(500).send(error)
        
    }	
    });
    

    

   const userSecure=({
    doctorUsername,
    username,
    email,
    phoneNumber,
    password,
    firstName,
    lastName,
    active,
    appointments,
    reports,
    userType,
    usernames

   })=>({
    doctorUsername,
    username,
    email,
    phoneNumber,
    firstName,
    lastName,
    active,
    appointments,
    reports,
    userType,
    usernames 
})

   router.get('/user',isAuth, (req, res) => {
    res.status(200).send({user:userSecure(req.user)});
    
   });



module.exports = router;