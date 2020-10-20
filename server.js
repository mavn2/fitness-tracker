//Dependencies
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

//Create connection to database
mongoose.connect('mongodb://localhost/workout', {useNewUrlParser: true})

//Create db variable so testing methods can be used on connection
const db = mongoose.connection;
db.once('open', function() {
  console.log('Connected!')
})

//Create an express app
const app = express();

//Ports for app to use in local/deployed environments
const PORT = 8080 || process.env.PORT;

//Middleware to parse and log requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));

//Directory for static files
app.use(express.static("public"));

//Backend routes
//require("./routes/api")(app)
app.use(require('./routes/html'))

//Run server
app.listen(PORT, () => {
  console.log(`App now running on port ${PORT}`)
});
