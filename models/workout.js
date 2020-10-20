//Dependencies
const mongoose = require('mongoose');

//Create schema for exercise data w/ mongoose
const workoutSchema = new mongoose.Schema({
  day: {type: Date, default: Date.now},
  exercises: [{
    type: String,
    name: String,
    duration: Number,
    weight: Number,
    reps: Number,
    sets: Number
  }]
});


//Compile schema into model, attaching CRUD methods to schema
const Workout = mongoose.model('Workout', workoutSchema);

//Export model for use in router
module.exports = Workout;