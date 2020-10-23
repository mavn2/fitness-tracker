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
    //Return sorted workouts, or throw error 
    .then(result => {
      res.json(result)
    })
    .catch(err => {
      res.status(400).json(err)
    });
})

//Add exercise: put api/workouts
router.put('/api/workouts/:id', (req, res) => {
  console.log('id ' + req.params.id)
  console.log('body ' + req.body)
  db.Workout.findOneAndUpdate({ '_id': req.params.id }, { exercises: req.body }, { new: true})
    .then(result => {
      res.json(result);
      console.log('result' + result);
    })
    .catch(err => {
      res.status(400).json(err)
    });
})
//Add workout: post api/workouts
router.post('/api/workouts', ({ body }, res) => {
  db.Workout.create(body)
  .then((result) => {
    res.json(result)
    console.log(result)
  })
  .catch(err => {
    res.status(400).json(err)
  });
})

//Get workouts in specified range: get /api/workouts/range


//Export router w/ added methods for use by app
module.exports = router;