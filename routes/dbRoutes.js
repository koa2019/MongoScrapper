// Dependencies
// =============================================================
// necessary for scraping html parsing & scraping
var axios = require('axios');
var cheerio = require('cheerio');

// import entire models folder
var db = require("../models");

// Database Routes
// =============================================================
// export this function that's passing an express server instance as an arguement
module.exports = function (app) {

    // app.get('/', (req, res) => {

    //     // handlebars renders index
    //     res.render('index', );
    // });

    // gets all json from returned data from the GET call to news url
    app.get('/scrape', function (req, res) {

        // scrape site
        var url = 'https://www.factcheck.org/'
        axios.get(url)
            .then(function (response) {

                // '$' shorthand for cheerio's selector commands, similar to jQuery's '$'
                // Load HTML into cheerio and save it to a variable
                var $ = cheerio.load(response.data);

                // Select each element in the HTML body from which you want information.
                $('.post').each(function (i, element) {

                    var result = {};
                    var incompleteResults = [];

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
                    }
                    else {
                        incompleteResults.push({
                            headline: headline,
                            summary: summary,
                            thumbnail: thumbnail,
                            link: link
                        });
                    };
                    // console.log(result);

                    db.Article.create(result)
                        .then(dbArticle => console.log(dbArticle))
                        .catch(err => console.log(err));
                });
                // send client success message
                res.send("Scrape Successful");
            }).catch(err => res.sendStatus(500));
    });

    // Route for all Articles in db
    // app.get('/articles', (req, res) => {
    app.get('/', (req, res) => {

        db.Article.find({})
            // handlebars renders needs page & a object
            // .then(dbArticle => res.json(dbArticle))
            // .then(dbArticle => res.render('index', res.json(dbArticle)))
            .then(dbArticle => { res.render('index', { articles: dbArticle }) })
            .catch(err => res.json(err));
    });

    // route to retreieve one article by id passed from req.params & populate with all Notes associated with article id
    app.get('/articles/:id', (req, res) => {

        // findOne Articles documents in db 
        db.Article.findOne({ _id: req.params.id })
            .populate('note')
            .then(dbArticle => res.json(dbArticle))
            .catch(err => res.json(err));
    });

    // route to save/update a Note associated with Article id in db
    app.post('/articles/:id', (req, res) => {

        console.log(req.body)
        // create a new Note with data from req.body
        db.Note.create(req.body)
            // if successfully created in db then return find & update Article with 3 obj params (article id, note id & new: true)
            // new: true will return updated
            .then(dbNote => { return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote.id }, { new: true }) })
            .catch(err => {
                res.sendStatus(500)
                console.log(err)
            });
    });

};

