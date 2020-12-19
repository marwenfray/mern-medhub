const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    doctorUsername:{
        type: String,
        unique:false
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    phoneNumber: {
        type: Number,
        unique: true,
        required:true,
        minlength: 8,
        maxlength: 8

    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 20
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 20
    },
    active:{
        type:Boolean,
        default:true
    },
    appointments:[{
        appointment: {type:Date},
        name:{type:String}
    }],
    reports:[
        {
            report : {type:String},
            date:{type: Date}
        }
    ],
    userType:{
        type:String
    },
    usernames:[{
        type:String,
        trim:true
    }]


});

module.exports = mongoose.model("User", userSchema);