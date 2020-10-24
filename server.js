//Dependencies
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

//Create connection to database in local or deployed environments
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/workout', 
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);

//Create an express app
const app = express();

//Ports for app to use in local/deployed environments
const PORT = process.env.PORT || 8080;

//Middleware to parse and log requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));

//Directory for static files
app.use(express.static("public"));

//Backend routes
app.use(require('./routes/api'));
app.use(require('./routes/html'));

//Run server
app.listen(PORT, () => {
  console.log(`App now running on port ${PORT}`)
});

