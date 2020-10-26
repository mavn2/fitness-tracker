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
  //Set the range based on Date.getDay()'s's 0-6 output
  let range = new Date().getDay();

  //Set a date for the start of the week based on the range and the current date
  let weekDate = new Date().setDate(new Date().getDate() - range);

  //Fetch all workouts for the week so far, using the date defined above and setting the time to midnight
  db.Workout.find({day: {$gte: new Date(new Date(weekDate).setHours(0,0,0))}})

  //Sort workouts by date, ensuring accuracy
    .sort({ day: 1})

  //Sort data to fit the table rendering in stats.js
  .then(result => {
    console.log(result)

    //Array of seven objects, one for each day of the week. The exercises array in each allows the script in stats.js to parse 'empty' objects, where it would otherwise throw an error.
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

    //Return days, which now holds the week's exercises ordered from 0-6, Sunday-Saturday, as presented on the chart in stats.js
    res.json(days);
  })

  //Throw error if request fails
  .catch(err => {
    res.status(400).json(err);
  });
});

//Export router w/ added methods for use by app
module.exports = router;
