const mongoose = require('mongoose')

const requestSchema = mongoose.Schema({
    
    patientName:{
        type:String,
        required:true
    },
    patientCont:{
        type:Number,
        required:true
    },
    patientEmail:{
        type:String,
        required:true
    },
    patientTest:{
        type:String,
        required:true
    },
    testPrice:{
        type:String,
        required:true
    }
})

const request = new mongoose.model("request", requestSchema);

module.exports= request;