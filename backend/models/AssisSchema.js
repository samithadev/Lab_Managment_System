const mongoose = require('mongoose')

const AssisSchema = mongoose.Schema({
    
    assisName:{
        type:String,
        required:true
    },
    assisQuali:{
        type:String,
        required:true
    },
    assisAge:{
        type:Number,
        required:true
    },
    assisEmail:{
        type:String,
        required:true
    },
})

const assistant = new mongoose.model("assistant", AssisSchema);

module.exports= assistant;