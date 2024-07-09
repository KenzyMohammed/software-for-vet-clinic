const asyncHandler = require("express-async-handler");
const Visit = require("../models/Visit");

// @desc    Add a visit
// @route   POST api/visit/addVisit
// @access  private
const addVisit = asyncHandler(async (req, res) => {
    const {staff_id, pet_id, date, cost, description, type} = req.body;

    // check if any input is empty
    if(!staff_id || !pet_id || !date || !cost || !description || !type) {
        throw new Error("Please enter all fields");
    }

    // create pets's profile
    const newVisit = await Visit.create({
        staff_id, pet_id, date, cost, description, type
    });

    // when the pets's profile is done created
    if(newVisit) {
        res.status(201).json({
            _id: newVisit.id,
        });
    }
});

// @desc    Get all visits
// @route   GET api/visit/getAll
// @access  private
const getAllVisits = asyncHandler(async (req, res) => {
    const allVisits = await Visit.aggregate([
        {
        $lookup: {
            from: "pets",
            localField: "pet_id",
            foreignField: "_id",
            as: "pet",
        },
        }, {
            $unwind: {
            path: "$pet",
        },
        }, {
        $project: {
            "pet.name": 1,
            "pet._id": 1,
            "description": 1,
            "type": 1,
            "date": 1,
        }, }
    ]);

    if(allVisits) {
        res.status(200).json(allVisits);
    }
});



module.exports = {
    addVisit,
    getAllVisits
}