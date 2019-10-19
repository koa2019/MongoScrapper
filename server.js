//////////  DEPENDENCIES  ////////

require('dotenv').config();
var express = require('express');
var exphbs = require("express-handlebars");
var logger = require('morgan');
var mongoose = require('mongoose');


// necessary for scraping html parsing & scraping
var axios = require('axios');
var cheerio = require('cheerio');

// require all models in model folder. Must have an index.js to require in any models
var db = require('./models');

// set PORT for server
// Heroku needs process.env.PORT
var PORT = process.env.PORT || 3000;

// initialize an instance of express server app
var app = express();

// Set Handlebars as the default templating engine.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


////////// CONFIGURE MIDDLEWARE  ////////

// morgan for logging requests
app.use(logger('dev'));
// parse request body as json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// make pubic folder static
app.use(express.static("public"));

// connect mongoose to Mongo db
// If deployed, use the deployed database, connect mongoose to remote mongolab database.
// Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/mongoHeadlines';
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });


/////////  ROUTES  //////// 

require('./routes/dbRoutes')(app);

// initiate server to start listening for HTTP requests
app.listen(PORT, () => {
    console.log(
        "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
        PORT,
        PORT
    );
});

// export express server instance
module.exports = app;