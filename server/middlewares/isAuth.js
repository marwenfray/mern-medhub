const jwt = require('jsonwebtoken');
const config = require("config");
const User = require('../models/User');


module.exports = async (req,res,next)=> {
  try {
    //setting up the token
      let  token;
      if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
      }
      //verifying the token
      if(!token){
          return res.status(400).send({msg:'unauthorized'})
      }
      //decoding the token
      const decoded = await jwt.verify(token, config.get("secret"))
      const user = await User.findById(decoded._id)
      if (!user){ 
        return res.status(400).send({msg:'unauthorized'})
      }

    req.user = user;
      next()
  } catch (error) {
    return res.status(500).send({ msg: "Unauthorized" })
  }
}