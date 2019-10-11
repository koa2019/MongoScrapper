// dependencies
require("dotenv").config();
var express = require('express');
var mongojs = require('mongojs');

// necessary for html parsing & scraping
var axios = require('axios');
var cheerio = require('cheerio');

// initialize an instance of express server app
var app = express();

// set PORT for express
// Heroku needs process.env.PORT
var PORT = process.env.PORT || 3000;

// Database configuration
var databaseUrl = "scraperDb";
var collections = ["scrapedData"];

// Hook mongojs configuration to the db variable
var db = mongojs(databaseUrl, collections);
db.on("error", function(error) {
    console.log("Database Error:", error);
});

// If deployed, use the deployed database, connect mongoose to remote mongolab database.
// Otherwise use the local mongoHeadlines database
// var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// mongoose.connect(MONGODB_URI);

//      ########### ROUTES ###########

app.get('/', (req, res) => {
    res.send('Homepage');
});

// gets all json from returned data from the GET call to news url
app.get('/all', function(req, res) {

    db.collections.find({}, function(err, results) {
        if (err) {
            console.log('find() err ', err);
        } else {
            // send the result of this query to the browser
            res.json(results);
        }
    });
});

// scrape site
var url = 'https://www.factcheck.org/'
axios.get(url)
    .then(function(response) {

        // Load the HTML into cheerio and save it to a variable
        // '$' shorthand for cheerio's selector commands, similar to jQuery's '$'
        var $ = cheerio.load(response.data);
        var results = [];
        // Select each element in the HTML body from which you want information.
        $('.post').each(function(i, element) {

            var headline = $(element).children().find('a').text();
            var link = $(element).find('a').attr('href');
            var summary = $(element).children().find('p').text();
            var thumbnail = $(element).children().find('img').attr('src');

            if (headline && link && summary && thumbnail) {
                results.push({
                    headline: headline,
                    summary: summary,
                    thumbnail: thumbnail,
                    link: link
                });
            }
            // console.log(results);

            db.collections.insert(results);

            // db.collections.insert({
            // headline: headline,
            // summary: summary,
            // thumbnail: thumbnail,
            // link: link
            // });
        });

    })
    .catch(function(err) {
        console.log('axios get error ', err);
        res.send('axios get error ', err);
    });


// initiate server to start listening for HTTP requests
app.listen(PORT, () => {
    console.log(
        "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
        PORT,
        PORT
    );
});