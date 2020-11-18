const jwt = require('jsonwebtoken');
const config = require("config");
const User = require('../models/User');


module.exports = async (req,res,next)=> {
  try {
      const token=req.headers["authorization"];
      if(!token){
          return res.status(400).send({msg:'unauthorized'})
      }
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