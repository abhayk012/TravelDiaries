const mongoose=require('mongoose')

// create schema
const profileSchema=new mongoose.Schema({
    profileimg:{
        type: String,
        require: true
    },
    userId: {
        type: String,
        require: true
    }
})
const profile=mongoose.model("profile",profileSchema)
module.exports=profile;