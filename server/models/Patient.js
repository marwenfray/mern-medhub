const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const patientSchema = new Schema({
    doctorUsername:{
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        unique: true
    },
    phoneNumber: {
        type: Number,
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
    appointments:[{
        type: Date
    }],
    report:[
        {
            type : String
        }
    ]
});

module.exports = mongoose.model("Patient", patientSchema);