const { addVisit } = require("../controllers/visitController");
const asyncHandler = require("express-async-handler");
const dotenv = require("dotenv").config();
const connectDB = require("../config/db");

describe("Visit", () => {
    // test for the condition if the vet didn't enter all the data of a visit
    it("Adding a visit: Throw error if the vet didn't enter all the data", asyncHandler(async () => {
        const req = {
            body: {
                cost: 20,
                age: 50,
                type: "check-up"
            }
        };

        await expect(addVisit(req, res={})).rejects.toThrowError("Please enter all fields");
    }));
});