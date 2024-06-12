const mongoose=require('mongoose')

// create schema
const userschema=new mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    }
})
const users=mongoose.model("users",userschema)
module.exports=users;