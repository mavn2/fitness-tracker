//Import express router class
const router = require('express').Router();

//Require path to simplify routing in different environments
const path = require('path')

//Define Required Routes

// / route for homepage serves index.html
// /stats route serves stats.html
// /exercise route serves exercise.html

//Export router w/ added methods for use by app
module.exports = router;