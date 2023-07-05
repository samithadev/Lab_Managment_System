const express = require("express")
const router = express.Router();
const Assis = require("../models/AssisSchema")

//add test
router.post("/addAssis",async (req,res)=>{
    console.log(req.body)

    const {assisName,assisQuali,assisAge,assisEmail}= req.body;

    if(!assisName || !assisQuali || !assisAge || !assisEmail){
        res.status(404).json("plese fill the data")
    }

    try{
        const preAssis = await Assis.findOne({assisEmail:assisEmail});
        if(preAssis){
            res.status(404).json("Assistant is availabel already")
        }else{
            const addassis = new Assis({assisName,assisQuali,assisAge,assisEmail})
            await addassis.save();
            res.status(201).json("Add Assistant")
        }

    }catch(err){
        res.status(404).json(err)
    }
})


//get All Test Data
router.get("/getassis", async(req,res)=>{
    try{
        const Assisdata= await Assis.find();
        res.status(201).json(Assisdata);
    }catch(err){
        res.status(422).json(err)
    }
})

//get signle Test Data
router.get("/getassis/:id", async(req,res)=>{
    try{
       const {id}=req.params;
       const singleAssis=await Assis.findById({_id:id});
       res.status(201).json(singleAssis);
    }catch(err){
        res.status(422).json(err);
    }
})


//Delete Test Data
router.delete("/deleteassis/:id", async(req,res)=>{
    try{
       const {id} = req.params;
       const deleteassis=await Assis.findByIdAndDelete({_id:id});
       res.status(201).json(deleteassis);
    }catch(err){
        res.status(422).json(err);
    }
})

// update Test data
router.patch("/updateassis/:id",async(req,res)=>{
    try {
        const {id} = req.params;

        const updateassis = await Assis.findByIdAndUpdate(id,req.body,{
            new:true
        });

        res.status(201).json(updateassis);

    } catch (error) {
        res.status(422).json(error);
    }
})
module.exports = router;