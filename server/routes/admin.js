const router = require('express').Router();
const bcrypt = require('bcrypt')
const isAuth = require ('../middlewares/isAuth')
const User = require('../models/User');



router.post('/addAdmin', isAuth, async (req, res) => {
    const user=req.user
    const{username, email,phoneNumber,password,firstName,lastName}= req.body
    try {
        if(user.userType!=="admin") {res.status(401).send({msg:"Unauthorized"})}
        let admin = await User.findOne({email})
    admin? res.status(400).send({msg: "email already exists"}):
    admin= new User({
        username,
        email,
        password,
        phoneNumber,
        firstName,
        lastName,
        userType:"admin"

    })
    const salt=10;
    const hashed= await bcrypt.hash(password, salt);
    admin.password= hashed;
    await user.save()
    res.status(200).send({msg:"user saved", admin})    
    } catch (error) {
        res.status(500).send(error)
    }
});

router.post('/add-doctor',isAuth,async (req, res) => {
    const {username}=req.body 	
    const user = req.user
    
    try {
        if(user.userType!=="admin") {res.status(401).send({msg:"Unauthorized"})}
         else {let doctor= await User.findOne({usernames:{$in:[username]}})
          doctor?res.status(400).send({msg: "username already exists"}):
           user.usernames.push(username);
          user.save()
          res.send({user})}
    } catch (error) {
        res.status(500).send(error)
        
    }
});

router.put('/ban-doctor/:_id',isAuth, async (req, res) => {
      const user = req.user
      const _id = req.params
   try {
    if(user.userType!=="admin") {res.status(401).send("Unauthorized")}

        let doc = await User.findById(_id)
        if (!doc) {res.status(400).send({msg: "doctor doesn't exist"});}
        if(doc.active)
        {doc.active=false}
        else{doc.active=true}
        doc.save()
        res.send(doc)

   } catch (error) {
    res.status(500).send(error)
   }
});

router.get('/doctor-list',isAuth,async (req, res) => {
    const user = req.user

     try {
        if(user.userType!=="admin") {res.status(401).send("Unauthorized")}
         let doc = await User.find({userType:"doctor"})
        !doc? res.status(400).send({msg:'the list is empty'}):
         res.send(doc)
     } catch (error) {
        res.status(500).send(error)
     }
});

module.exports = router;