const express = require("express")
const router = express.Router();
const Tests = require("../models/testsSchema")

//add test
router.post("/addTest",async (req,res)=>{
    console.log(req.body)

    const {testName,testDes,testPrice,testOption}= req.body;

    if(!testName || !testDes || !testPrice || !testOption){
        res.status(404).json("plese fill the data")
    }

    try{
        const preTest = await Tests.findOne({testName:testName});
        if(preTest){
            res.status(404).json("Test is availabel already")
        }else{
            const addtest = new Tests({testName,testDes,testPrice,testOption})
            await addtest.save();
            res.status(201).json("Add test")
        }

    }catch(err){
        res.status(404).json(err)
    }
})


//get All Test Data
router.get("/gettest", async(req,res)=>{
    try{
        const Testdata= await Tests.find();
        res.status(201).json(Testdata);
    }catch(err){
        res.status(422).json(err)
    }
})

//get signle Test Data
router.get("/gettest/:id", async(req,res)=>{
    try{
       const {id}=req.params;
       const singleTest=await Tests.findById({_id:id});
       res.status(201).json(singleTest);
    }catch(err){
        res.status(422).json(err);
    }
})


//Delete Test Data
router.delete("/deletetest/:id", async(req,res)=>{
    try{
       const {id} = req.params;
       const deletetest=await Tests.findByIdAndDelete({_id:id});
       res.status(201).json(deletetest);
    }catch(err){
        res.status(422).json(err);
    }
})

// update Test data
router.patch("/updatetest/:id",async(req,res)=>{
    try {
        const {id} = req.params;

        const updatetest = await Tests.findByIdAndUpdate(id,req.body,{
            new:true
        });

        res.status(201).json(updatetest);

    } catch (error) {
        res.status(422).json(error);
    }
})
module.exports = router;