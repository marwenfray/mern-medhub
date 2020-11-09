const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const adminSchema = new Schema({
    email:{
        type:String,
        required:true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    usernames:[{
        type:String,
        trim:true
    }]

});

module.exports = mongoose.model("Admin", adminSchema);