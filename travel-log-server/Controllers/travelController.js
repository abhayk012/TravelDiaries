const { request, query } = require('express');
const places = require('../Models/travelSchema')
// add places
exports.addplaces = async (req, res) => {
    console.log("Inside addplacesController");
    const userId = req.payload
    console.log(userId);
    const placeimg = req.file.filename;
    const { place, map, description, attractions, name } = req.body;
    try {
        const newplace = new places({
            place: place,
            attractions: attractions,
            map: map,
            description: description,
            placeimg: placeimg,
            name: name,
            userId: userId
        })
        await newplace.save();
        res.status(200).json("Successfully added the place")
    } catch (err) {
        res.status(401).json("unable to add place due to:", err)
    }
}

exports.editplace = async (req, res) => {
    const { id } = req.params;
    const userId = req.payload;
    const { place, map, description, attractions, placeimg } = req.body;
    const uploadPlaceimg = req.file ? req.file.filename : placeimg;
    try {
        const updatePlace = await places.findByIdAndUpdate(
            { _id: id },
            {
                place: place,
                attractions: attractions,
                map: map,
                description: description,
                placeimg: uploadPlaceimg,
                userId: userId
            },
            { new: true }
        )
        await updatePlace.save()
        res.status(200).json("Place Details updated successfully")
    } catch (err) {
        res.status(401).json("Unable to update due to:", err)
    }
}



exports.getuserplaces = async (req, res) => {
    const userId = req.payload
    try {
        const userproject = await places.find({ userId: userId });
        res.status(200).json(userproject)
    } catch (err) {
        res.staus(401).json("request failed due to", err)
    }
}

exports.getallplaces = async (req, res) => {
    const searchkey = req.query.search
    console.log(searchkey);
    const query = {
        place: {
            // regular expresiion
            // i = to remove case sensitivity
            $regex: searchkey, $options: 'i'
        }
    }
    try {
        const allplaces = await places.find(query);
        res.status(200).json(allplaces)
    } catch (err) {
        res.staus(401).json("request failed due to", err)
    }
}

exports.getallplacesnosearch = async (req, res) => {
    const { id } = req.params;
    try {
        const allplaces = await places.find(id);
        res.status(200).json(allplaces)
    } catch (err) {
        res.staus(401).json("request failed due to", err)
    }
}

exports.deleteUserPlace = async (req, res) => {
    const { id } = req.params
    console.log("inside delete");
    try {
        const removePlace = await places.findByIdAndDelete({ _id: id })
        res.status(200).json("Place removed successfully")
    } catch (err) {
        res.status(401).json("delete failed", err)
    }
}

// exports.addreview=async(req,res)