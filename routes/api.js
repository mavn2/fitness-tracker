//Require express router class
const router = require('express').Router();
const db = require('../models')

//Schema for added objects to database
const exercise = require('../models')

//Define required routes

//Get workouts sorted by date
router.get('/api/workouts', (req, res) => {
  db.Workout.find({})
    //Sorts day in ascending order, ensuring the most recent workout is last
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
  db.Workout.findOneAndUpdate({ '_id': req.params.id }, { $push: { exercises: req.body } }, { new: true})
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
  db.Workout.create(body)
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
  //Fetch all workouts from the last week
  db.Workout.find({day: {$gte: new Date().getDate()-6}})
  //Sort workouts by date, ensuring accuracy
    .sort({ day: 1})
  //Sort data to fit table rendering in stats.js
  .then(result => {

    //Array of seven objects, one for each day of the week. The exercises array in each allows the script in stats.js to parse and render 'empty' days.
    let days = [
      { exercises: [] },
      { exercises: [] },
      { exercises: [] },
      { exercises: [] },
      { exercises: [] },
      { exercises: [] },
      { exercises: [] }
    ];
    //Iterate through the week's workouts, adding the contents of each one's exercises array to the relevant array in days.
    result.forEach(element => {
      //The getDay method is used to match each workout to the correct element to the days array.
      //Concat is used rather than push to produce an array of objects, rather than arrays
      days[element.day.getDay()].exercises = days[element.day.getDay()].exercises.concat(element.exercises);
    })
    //Return days, which now holds the week's exercises correctly ordered for script.js
    res.json(days)
  })
  //Throw error if request fails
  .catch(err => {
    res.status(400).json(err);
  });
});

//Export router w/ added methods for use by app
module.exports = router;