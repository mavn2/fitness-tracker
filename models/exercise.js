//Dependencies
const mongoose = require('mongoose');

//Create schema for exercise data w/ mongoose
const exerciseSchema = new mongoose.Schema({

});

//Compile schema into model, attaching CRUD methods to schema
const Exercise = mongoose.model('Exercise', exerciseSchema);

//Export model for use in router
module.exports = Exercise;