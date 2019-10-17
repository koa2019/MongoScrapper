// dependencies
require("dotenv").config();
var express = require('express');
var logger = require("morgan");
var mongoose = require("mongoose");

// necessary for scraping html parsing & scraping
var axios = require('axios');
var cheerio = require('cheerio');

// require all models in model folder
var db = require("./models");

// set PORT for express
// Heroku needs process.env.PORT
var PORT = process.env.PORT || 3000;

// initialize an instance of express server app
var app = express();

//              configure middleware

// morgan for logging requests
app.use(logger('dev'));
// parse request body as json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// make pubic folder static
app.use(express.static('public'));

// connect mongoose to Mongo db
// mongoose.connect('mongodb://localhost/mongoHeadlines', { useNewUrlParser: true });

// If deployed, use the deployed database, connect mongoose to remote mongolab database.
// Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI);


//             ROUTES 

// gets all json from returned data from the GET call to news url
app.get('/scrape', function(req, res) {

    // scrape site
    var url = 'https://www.factcheck.org/'
    axios.get(url)
        .then(function(response) {

            // Load the HTML into cheerio and save it to a variable
            // '$' shorthand for cheerio's selector commands, similar to jQuery's '$'
            var $ = cheerio.load(response.data);

            // Select each element in the HTML body from which you want information.
            $('.post').each(function(i, element) {

                var result = {};

                // capture data from these html elements
                var headline = $(element).children().find('a').text();
                var link = $(element).find('a').attr('href');
                var summary = $(element).children().find('p').text();
                var thumbnail = $(element).children().find('img').attr('src');

                // check if there's data before saving to obj
                if (headline && link && summary && thumbnail) {
                    result.headline = headline;
                    result.summary = summary;
                    result.thumbnail = thumbnail;
                    result.link = link;
                };
                console.log(results);

                db.Article.create(result)
                    .then(dbArticle => console.log(dbArticle))
                    .catch(err => console.log(err));
            });
            // send client success message
            res.send("Scrape Successful");
        });
});

// Route for all Articles in db
app.get('/articles', function(req, res) {
    db.Article.find({})
        .then(function(dbArticle) {
            res.json(dbArticle);
        })
        .catch(function(err) {
            res.json(err);
        });
});

// initiate server to start listening for HTTP requests
app.listen(PORT, () => {
    console.log(
        "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
        PORT,
        PORT
    );
});