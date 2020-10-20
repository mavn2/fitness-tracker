//Require express router class
const router = require('express').Router();
const db = require('../models')

//Schema for added objects to database
const exercise = require('../models')

//Define required routes

//Get workouts sorted by date: get /api/workouts
router.get('/api/workouts', (req, res) => {
  db.Workout.find({})
    .sort({ day: 1})
    .then(result => {
      res.json(result)
      console.log(result)
    })
    .catch(err => {
      res.status(400).json(err)
    });
})
//Add exercise: put api/workouts
//Add workout: post api/workouts

//Get workouts in specified range: get /api/workouts/range


//Export router w/ added methods for use by app
module.exports = router;