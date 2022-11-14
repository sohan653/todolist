const express=require("express");
const mongoose=require("mongoose")
const mongoSanitize=require("express-mongo-sanitize");
const xssClean=require("xss-clean");
const hpp=require("hpp");
const expressRateLimit=require("express-rate-limit");
const helmet=require("helmet");
const cors=require("cors");
const { readdirSync } = require("fs")


const app=express()

//use middlewar
app.use(express.json())
app.use(cors());
app.use(helmet());
app.use(mongoSanitize);
app.use(xssClean());
app.use(hpp())

//request rate limit
const limiter=expressRateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1000,  //Limit each IP to 100 requests per `window` (here, per 15 minutes)
})
app.use(limiter);


//database connection

const URL="mongodb://127.0.0.1:27017/Todo"
const OPTIONS={
    user:"",
    pass:""
}
mongoose.connect(URL,OPTIONS,(error)=>{
    if(!error){
        console.log("server conection successful")
    }
})









//using router
readdirSync("./routes").map(r => app.use("/api/v1", require(`./routes/${r}`)))



// listening port


app.listen(3000,()=>{
    console.log("server running successfully on ")
})
