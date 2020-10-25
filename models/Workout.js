//Dependencies
const mongoose = require('mongoose');

//Create schema for exercise data w/ mongoose
const workoutSchema = new mongoose.Schema({
  day: {type: Date, default: Date.now},
  exercises: [],
  totalDuration: {
    type: String,
    //When queried, calculate the total duration of all exercises
    get: function(){
      //Define result here to prevent possible null value if no exercises have been added to workout
      let result = 0;
      //Iterate through all exercises in workout and add their durations to result
      this.exercises.forEach(element => {
        result += element.duration
      });
      //Return result as a string rather then a number, as defined in type above,
      //since this value is only intended for presentation by the front end.
      return result.toString();
    }
    //Again, since this key is only referenced as part of displaying information on the front-end,
    //no set key/function is needed.
  }
})

//Enable the totalDuration get function to be passed when query results are converted to JSON 
workoutSchema.set('toJSON', { getters: true })


//Compile schema into model
const Workout = mongoose.model('Workout', workoutSchema);

//Export model to pass through index
module.exports = Workout;