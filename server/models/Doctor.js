const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const doctorSchema = new Schema({
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
        required: true,
        unique: true,
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
    }

});

module.exports = mongoose.model("Doctor", doctorSchema);