const mongoose=require('mongoose')

// create schema
const reviewschema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    review:{
        type:String,
        require:true
    },
    userId: {
        type: String,
        require: true
    }
})
const reviews=mongoose.model("reviews",reviewschema)
module.exports=reviews;