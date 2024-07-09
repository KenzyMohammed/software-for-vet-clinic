const { registerPet, editProfile } = require("../controllers/petController");
const asyncHandler = require("express-async-handler");
const dotenv = require("dotenv").config();
const connectDB = require("../config/db");

describe("Pet", () => {
    // test for the condition if the vet didn't enter all the data of a pet
    it("Registering pet: Throw error if the vet didn't enter all the data", asyncHandler(async () => {
        const req = {
            body: {
                name: "pet",
                age: "21",
            },
        };

        await expect(registerPet(req, res={})).rejects.toThrowError("Please enter all fields");
    }));

     // test for the condition if the vet didn't enter all the data of a pet when editing his profile
    it("Edit pet profile: Throw error if the vet didn't enter all the data when editing", asyncHandler(async () => {
        const req = {
            body: {
                name: "pet",
                age: "21",
            },
            params: {
                id: "663899fa91f44e6c79688794"
            }
        };

        await expect(editProfile(req, res={})).rejects.toThrowError("Please enter all fields");
    }));
});