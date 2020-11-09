const jwt = require('jsonwebtoken');
const Admin= require ('../models/Admin');
const config = require("config");


module.exports = async (req,res,next)=> {
  try {
      const token=req.headers["authorization"];
      if(!token){
          return res.status(400).send({msg:'unauthorized'})
      }
      const decoded = await jwt.verify(token, config.get("secret"))
      const admin = await Admin.findById(decoded._id)
      if (!admin){ 
        return res.status(400).send({msg:'unauthorized'})
      }

    req.admin = admin;
      next()
  } catch (error) {
    return res.status(500).send({ msg: "Unauthorized" })
  }
}