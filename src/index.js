//require (`dotenv`) .config({path:`./env`}) 
// this makes inconsistency in code 
 import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";
// with this module you have to make change in package.json as wll

dotenv.config({
   path:'./env'
 })


connectDB()
.then(()=>{
    app.listen(process.env.PORT ||8000,()=>{
        console.log(`Server is running at port:${process.env.PORT}`)
    } )
})
.catch((err=>{
    console.log("Mongo DB connection failed!!!")
}))













//import { DB_NAME } from "./constants"

//import express from "express"
//import mongoose, { connect } from "mongoose";

// const app = express()
















/*
APPROACH TO CONNECT DATABASE (first )
(async ()=>{
    try {
       await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
       app.on("error",(error)=>{
        console.log("ERROR:",error);
        throw error
       })

       app.listen(process.env.PORT,()=>{
        console.log(`App is lsitening on port ${process.env.PORT}`);
       })

}catch(error){
    console.error("ERROR:",error)
    throw error
}

})()


*/  










// function connectDB(){}

// connectDB()