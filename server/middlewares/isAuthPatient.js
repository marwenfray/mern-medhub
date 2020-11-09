const jwt = require('jsonwebtoken');
const Patient= require ('../models/Doctor');
const config = require("config");


module.exports = async (req,res,next)=> {
  try {
      const token=req.headers["authorization"];
      if(!token){
          return res.status(400).send({msg:'unauthorized'})
      }
      const decoded = await jwt.verify(token, config.get("secret"))
      const patient = await Patient.findById(decoded._id)
      if (!patient){ 
        return res.status(400).send({msg:'unauthorized'})
      }

    req.patient=patient
      next()
  } catch (error) {
    return res.status(500).send({ msg: "Unauthorized" })
  }
}