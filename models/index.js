//Export model through index so that server can  require the entire file, simplifying
//The process of adding any additional models
const Workout = require('./Workout')
module.exports = {Workout: Workout}