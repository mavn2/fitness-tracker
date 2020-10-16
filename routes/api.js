//Require express router class
const router = require('express').Router();

//Schema for added objects to database
const exercise = require('../models/exercise')

//Define required routes

//Get last workout: get /api/workouts
//Add exercise: put api/workouts
//Add workout: post api/workouts

//Get workouts in specified range: get /api/workouts/range


//Export router w/ added methods for use by app
module.exports = router;