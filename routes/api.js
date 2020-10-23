//Require express router class
const router = require('express').Router();
const db = require('../models')

//Schema for added objects to database
const exercise = require('../models')

//Define required routes

//Get workouts sorted by date
router.get('/api/workouts', (req, res) => {
  db.Workout.find({})
    //Sorts day in ascending order, meaning the most recent workout is last
    .sort({ day: 1})
    //Return sorted workouts
    .then(result => {
      res.json(result);
    })
    //Throw error if request fails
    .catch(err => {
      res.status(400).json(err);
    });
});

//Add exercise: put api/workouts
router.put('/api/workouts/:id', (req, res) => {
  //Find workout to update based on id passed in url parameters, add exercise in request body
  //Setting new to true means the updated workout is returned
  db.Workout.findOneAndUpdate({ '_id': req.params.id }, { exercises: req.body }, { new: true})
    //Return workout with added exercise
    .then(result => {
      res.json(result);
    })
    //Throw error if request fails
    .catch(err => {
      res.status(400).json(err);
    });
});

//Add workout: post api/workouts
router.post('/api/workouts', ({ body }, res) => {
  //Create a workout object
  db.Workout.create(body);
  //Returned created workout
  .then((result) => {
    res.json(result);
  })
  //Throw error if request fails
  .catch(err => {
    res.status(400).json(err);
  });
});

//Get workouts in specified range: get /api/workouts/range
router.get('/api/workouts/range', (req, res) => {
  //Fetch all workouts from database, as requested in stats.js
  db.Workout.find({})
  //Sort workouts by date
    .sort({ day: 1})
  //Return list of workouts
  .then(result => {
    res.json(result);
  })
  //Throw error if request fails
  .catch(err => {
    res.status(400).json(err);
  });
});

//Export router w/ added methods for use by app
module.exports = router;