//import pets from DataTransfer.js
const pets = require("./data");
// import express
const express = require("express");
//import path
const path = require("path");
//initialize port constant
const PORT = 8080;

//initialize express server called app
const app = express();

//Get /--> return "API working!"
app.get("/", (req, res) => {
    res.sendFile("API working!");
});

app.listen(PORT, ()=>{
    console.log(`Server listening on port  ${PORT}`);
});