const mongoose = require('mongoose')

const testsSchema = mongoose.Schema({
    
    testName:{
        type:String,
        required:true
    },
    testDes:{
        type:String,
        required:true
    },
    testPrice:{
        type:Number,
        required:true
    },
    testOption:{
        type:String,
        required:true
    }
})

const tests = new mongoose.model("tests", testsSchema);

module.exports= tests;