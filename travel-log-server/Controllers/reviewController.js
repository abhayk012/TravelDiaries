const { request, query } = require('express');
const mongoose = require('mongoose');
const reviews = require('../Models/reviewSchema');
const ObjectId = mongoose.Types.ObjectId;

exports.addreviews = async (req, res) => {
    console.log("Inside addreviewsController");
    const userId = req.payload;
    console.log("userid:", userId);
    const { name, review } = req.body;
    console.log("name:", name);
    console.log("review:", review);
    try {
        const placeId = new ObjectId();
        const newreview = new reviews({
            placeId:placeId,
            name,
            review,
            userId: userId
        })
        await newreview.save();
        res.status(200).json("Successfully uploaded review")
    } catch (err) {
        res.status(401).json("unable to add project due to:", err)
    }
};

exports.getplacereview = async (req, res) => {
    const { placeId } = req.params;
    try {
        const placereviews = await reviews.find({ placeId: placeId });
        res.status(200).json(placereviews)
    } catch (err) {
        res.staus(401).json(`request failed due to:${err}`)
    }
}


exports.updateuserreview = async (req, res) => {
    const { id } = req.params;
    const userId = req.payload;
    console.log("userid:", userId);
    const { name, review } = req.body;
    console.log("name:", name);
    console.log("review:", review);

    try {
        const updatereview = await reviews.findByIdAndUpdate(
            { _id: id },
            {
                name,
                review,
                userId: userId
            },
            { new: true }
        )
        await updatereview.save()
        res.status(200).json("Profile updated successfully")
    } catch (err) {
        res.status(401).json("Unable to update due to:", err)
    }
}

exports.getuserreviews = async (req, res) => {
    const userId = req.payload
    try {
        const userreview = await reviews.find({ userId: userId });
        res.status(200).json(userreview)
    } catch (err) {
        res.staus(401).json("request failed due to", err)
    }
}

// exports.deleteUserreview = async (req, res) => {
//     const { id } = req.params
//     try {
//         const removereview = await reviews.findByIdAndDelete({ _id: id })
//         res.status(200).json("Profile deleted successfully")
//     } catch (err) {
//         res.status(401).json("delete failed", err)
//     }
// }


exports.deleteUserreview = async (req, res) => {
    const { id } = req.params
    console.log("inside delete");
    try {
        const removereview = await reviews.findByIdAndDelete({ _id: id })
        res.status(200).json("Profile deleted successfully")
    } catch (err) {
        res.status(401).json("delete failed", err)
    }
}
