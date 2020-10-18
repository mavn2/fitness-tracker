//Import express router class
const router = require('express').Router();

//Require path to simplify routing in different environments
const path = require('path')

//Build routes using express middleware

// / route for homepage serves index.html
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
});

// /stats route serves stats.html

router.get('/stats', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/stats.html'))
});
// /exercise route serves exercise.html
router.get('/exercise', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/exercise.html'))
});

//Export router w/ added methods for use by app
module.exports = router;