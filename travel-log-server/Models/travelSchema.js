
// import mongoose
const mongoose = require("mongoose")

const travelSchema = new mongoose.Schema({
    place: {
        type: String,
        require: true
    },
    attractions: {
        type: String,
        require: true
    },
    map: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    placeimg: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    userId: {
        type: String,
        require: true
    }

})


const places = mongoose.model("places", travelSchema)

module.exports = places;