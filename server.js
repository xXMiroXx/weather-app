// Setup empty JS object to act as endpoint for all routes
const projectData = {};

//Global variables
const PORT = 3000;
// Require Express to run server and routes
const express = require("express");

const bodyParser = require("body-parser");
const cors = require("cors");
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

/**
 * Routes
 */
//Get Routes
app.get("/weather-data", (req, res) => {
    //Return data object to client
    res.send(projectData);
});
//Post routes
app.post("/weather-data", (req, res) => {
    // Extract values we need from request body
    const { temp, date, content } = req.body;
    // Check if everything is provided correctly or bad request returned
    if (!(temp && date && content))
        return res.status(400).json({ status: "fail", message: "Not all required Data provided!" });
    // Assign recived data to our data project object
    projectData.temp = temp;
    projectData.date = date;
    projectData.content = content;

    // Response to client that everything is okay
    res.send({ status: "success", message: "data recived successfully" });
});

// Listen to incoming requests on our port
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});