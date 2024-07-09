const express = require("express");
const dotenv = require("dotenv").config();
const cors = require('cors');
const connectDB = require("./config/db");
const { errorHandler } = require("./middleware/errorMiddleware");
const port = process.env.PORT | 5000;

// Setting up express
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({
    origin: '*',
    credentials: true }
));

// Handling errors
app.use(errorHandler);

// Connecting to the database
connectDB();

// Routes
app.use("/api/pet", require("./routes/petRoute"));
app.use("/api/visit", require("./routes/visitRoute"));

// Setting up the port to listen to my server
app.listen(port, () => {
    console.log(`Server started at port ${port}`)
});