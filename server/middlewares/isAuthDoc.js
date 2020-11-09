const jwt = require('jsonwebtoken');
const Doctor= require ('../models/Doctor');
const config = require("config");


module.exports = async (req,res,next)=> {
  try {
      const token=req.headers["authorization"];
      if(!token){
          return res.status(400).send({msg:'unauthorized'})
      }
      const decoded = await jwt.verify(token, config.get("secret"))
      const doctor = await Doctor.findById(decoded._id)
      if (!doctor){ 
        return res.status(400).send({msg:'unauthorized'})
      }

    req.doctor=doctor
      next()
  } catch (error) {
    return res.status(500).send({ msg: "Unauthorized" })
  }
}