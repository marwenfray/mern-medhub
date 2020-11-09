const mongoose = require('mongoose');
process.env.NODE_CONFIG_DIR = './server/config';

const config = require("config");


module.exports= async function(){
    try { await mongoose.connect(config.get("MONGOURI")    
    , {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    }
        );
        console.log('Database is connected!')
    }
     catch (err) {
      console.log(`Cannot connect to database!
      error: ${err}`)
        
    }
} 