const  express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
var cors = require('cors')

const app = express();

//add schema
const tests = require("./models/testsSchema")
const assis = require("./models/AssisSchema")
const request = require("./models/requestSchema")

//add router
const router = require("./routes/testsroutes")
const assisRoute = require("./routes/assisroutes")
const requestRoute = require("./routes/requestroutes")

dotenv.config();
app.use(cors());
app.use(express.json());
app.use(router);
app.use(assisRoute);
app.use(requestRoute);

mongoose.connect(process.env.Database).then(()=>{
    console.log("Database Connected!")
}).catch((err)=>{
    console.log(err);
});

app.listen(5000);