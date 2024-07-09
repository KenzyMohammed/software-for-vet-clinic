const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Owner = require("../models/Owner");
const Pet = require("../models/Pet");

// @desc    register a pet
// @route   POST api/pet/register
// @access  private
const registerPet = asyncHandler(async (req, res) => {
    const {owner_name, owner_phone, name, age, sex, weight, body_temperature, species, status} = req.body;

    // check if any input is empty
    if(!owner_name || !owner_phone || !name || !age || !sex || !weight || !body_temperature || !species || !status) {
        throw new Error("Please enter all fields");
    }

    let owner_id;
    // check if owner already exists
    const ownerExists = await Owner.findOne({phone: owner_phone});
    if(ownerExists) {
        owner_id = ownerExists.id;
    } else {
        const newOwner = await Owner.create({
            name: owner_name,
            phone: owner_phone
        });
        owner_id = newOwner.id;
    }

    // create pets's profile
    const newPet = await Pet.create({
        owner_id,
        name,
        age,
        sex,
        weight,
        body_temperature,
        species,
        status
    });

    // when the pets's profile is done created
    if(newPet) {
        res.status(201).json({
            _id: newPet.id,
        });
    }
});

// @desc    Get pets and owners
// @route   GET api/pet/petOwner
// @access  private
const getPetOwner = asyncHandler(async (req, res) => {
    const pets = await Owner.aggregate([
        {
        $lookup: {
            from: "pets",
            localField: "_id",
            foreignField: "owner_id",
            as: "pet",
        },
        }, {
        $unwind: {
            path: "$pet",
        },
        }, {
        $match: {
            "pet.status": {
                $ne: "archived",
            },
        },
        },
    ]);

    if(pets) {
        var petsOwners = [];
        pets.forEach((pet) => {
            petsOwners.push({
                petID: pet.pet._id,
                petName: pet.pet.name,
                ownerName: pet.name
            });
        });

        res.status(200).json(petsOwners);
    }
});

// @desc    Get a pet's profile
// @route   GET api/pet/profile/:id
// @access  private
const getPetProfile = asyncHandler(async (req, res) => {
    const petID = new mongoose.Types.ObjectId(req.params.id);

    const petData = await Pet.aggregate([{
        $lookup: {
            from: "visits",
            localField: "_id",
            foreignField: "pet_id",
            as: "visits",
        },
        }, {
        $match: {
            "_id": petID,
        },
        },
    ]);

    if(petData) {
        res.status(200).json(petData);
    }
});

// @desc    Edit pet's profile
// @route   PUT api/pet/editProfile/:id
// @access  private
const editProfile = asyncHandler(async (req, res) => {
    const petID = new mongoose.Types.ObjectId(req.params.id);
    const {name, age, sex, weight, body_temperature, species} = req.body;

    if(!name || !age || !sex || !weight || !body_temperature || !species) {
        throw new Error("Please enter all fields");
    }
    
    const editPet = await Pet.findByIdAndUpdate(petID, {
        $set: {
            name, age, sex, weight, body_temperature, species
        },
    });

    if(editPet) {
        res.status(201).json("Success");
    }
});

// @desc    Edit pet's status
// @route   PUT api/pet/editStatus/:id
// @access  private
const editStatus = asyncHandler(async (req, res) => {
    const petID = new mongoose.Types.ObjectId(req.params.id);
    const {status} = req.body;
    
    const editStatus = await Pet.findByIdAndUpdate(petID, {
        $set: {
            status
        },
    });

    if(editStatus) {
        res.status(201).json("Success");
    }
});


module.exports = {
    registerPet,
    getPetOwner,
    getPetProfile,
    editProfile,
    editStatus
}