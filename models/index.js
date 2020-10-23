//Export model through index so that server can  require the entire file, simplifying
//The process of adding any additional models
const Workout = require('./Workout')
//Exports model(s) as values in an object
module.exports = {Workout: Workout}