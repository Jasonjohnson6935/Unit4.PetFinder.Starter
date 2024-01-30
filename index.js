// import the pets array from data.js
const pets = require('./data');
//import path to be able to add styles to our application via index.html
const path = require("path");

// init express app
const express = require('express');
const app = express();

const PORT = 8080;

//allows us to be able to use style files
app.use(express.static(path.join(__dirname, "public")));

//allows us to be able to use style files
app.use(express.static(path.join(__dirname, "public")));

// GET - / - returns homepage
app.get('/', (req, res) => {
    // serve up the public folder as static index.html file
    res.sendFile(__dirname + "/public/index.html");
});


// hello world route
app.get('/api', (req, res) => {
    res.send('Hello World!');
});

// get all pets from the database
app.get('/api/v1/pets', (req, res) => {
    // send the pets array as a response
    res.json(pets);
});

// get pet by owner with query string
app.get('/api/v1/pets/owner', (req, res) => {
    // get the owner from the request query string
    const ownerName = req.query.owner;
    console.log('Owner name:', ownerName); // Check if ownerName is received correctly

    // find the pet in the pets array
    const pet = pets.filter(pet => pet.owner === ownerName);
    console.log('Filtered pets:', pet); // Check the filtered pets

    // send the pet as a response
    res.json(pet);
});

// get pet by name
app.get('/api/v1/pets/:name', (req, res) => {
    // get the name from the request
    const petName = req.params.name;

    // find the pet in the pets array
    const pet = pets.filter(
        (pet)=> pet.name.toLowerCase() === petName.toLowerCase());

    // send the pet as a response
    res.send(pet);
});

app.listen(PORT, () => {
    console.log('Server is listening on port ' + PORT);
});
