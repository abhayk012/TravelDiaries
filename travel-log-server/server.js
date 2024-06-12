console.log("Welcome to TravelDiary Server");

const router=require('./Routes/router')

require('dotenv').config()

const express=require('express')

require('./DB/connections')

const cors=require('cors')

const tdserver=express()

tdserver.use(cors())

tdserver.use(express.json())

tdserver.use(router)

tdserver.use('/uploads',express.static("./uploads"))

const PORT=4000;

tdserver.listen(PORT,()=>{
    console.log(`Server is running successfully at : ${PORT}`);
})

// define a route handler for the root URL ("/") 
tdserver.get('/',(req,res)=>{
    res.send("Travel diary server Ready and Running")
})