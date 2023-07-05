const express = require("express")
const router = express.Router();
const Requests = require("../models/requestSchema")

//add request
router.post("/addRequest",async (req,res)=>{
    console.log(req.body)

    const {patientName,patientCont,patientEmail,patientTest,testPrice}= req.body;

    if(!patientName || !patientCont || !patientEmail|| !patientTest|| !testPrice){
        res.status(404).json("plese fill the data")
    }

    try{
        const addrequest = new Requests({patientName,patientCont,patientEmail,patientTest,testPrice})
        await addrequest.save();
        res.status(201).json("Send Request")

    }catch(err){
        res.status(404).json(err)
    }
})


//get All request Data
router.get("/getrequest", async(req,res)=>{
    try{
        const Requestdata= await Requests.find();
        res.status(201).json(Requestdata);
    }catch(err){
        res.status(422).json(err)
    }
})

//get signle Request Data
router.get("/getrequest/:id", async(req,res)=>{
    try{
       const {id}=req.params;
       const singleRequest=await Requests.findById({_id:id});
       res.status(201).json(singleRequest);
    }catch(err){
        res.status(422).json(err);
    }
})


//Delete Request Data
router.delete("/deleterequest/:id", async(req,res)=>{
    try{
       const {id} = req.params;
       const deleterequest=await Requests.findByIdAndDelete({_id:id});
       res.status(201).json(deleterequest);
    }catch(err){
        res.status(422).json(err);
    }
})

// // update Test data
// router.patch("/updatetest/:id",async(req,res)=>{
//     try {
//         const {id} = req.params;

//         const updatetest = await Tests.findByIdAndUpdate(id,req.body,{
//             new:true
//         });

//         res.status(201).json(updatetest);

//     } catch (error) {
//         res.status(422).json(error);
//     }
// })

//send remainder
//Reminder email
const nodemailer = require("nodemailer");
const request = require("../models/requestSchema");

//send email
async function sendReminderEmail(reminder) {
  
  try {
    // Create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: "it21568732@my.sliit.lk", // Your email address
        pass: "200028300197", // Your email password
      },
    });

    // Send reminder email
    let info = await transporter.sendMail({
      from: 'it21568732@my.sliit.lk', // Sender address
      to: reminder.patientEmail, // Scheduled email address
      subject: "Lab Report: Ready", // Subject line
      text: `Hi ${
        reminder.patientName
      },\n\nYour Lab Report is ready. Come and collect.\n\nSincerely,\nMedi Lab`, // Plain text body
    });

    console.log("Message sent: %s", info.messageId);
  } catch (err) {
    console.error(err);
    throw new Error(`Error sending reminder email: ${err.message}`);
  }
}

router.post("/sendReminder/:id", async (req, res) => {
  try {
    const {id} = req.params;
    const reminder = await request.findById({_id:id});

    if (!reminder) {
      return res.sendStatus(404);
    }

    await sendReminderEmail(reminder);

    // Return success response
    res.json({ message: "Reminder email sent successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;