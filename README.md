# MongoScrapper

# Run instructions
* Download repo from Github
* In root folder of repo, install npm packages 'npm install'
* In terminal start express app by typing 'npm start'
* Terminal will confirm connection & brower will be listening on http://localhost:3000/

# App Psuedo
* require dependencies
    * cheerio - parsing HTML & finding html elements.
    * axios for front end ajax calls.
    * express - server
    * mongoose - node library for mongodb

* require all models in model folder

* declare variable PORT for heroku or localhost 

* declare variable app & initialize instance of express app server.

* start express app to listen for http requests

* configure middleware
    * direct express instance to use morgan logger for logging requests
    * direct express instance to use urlencoded to be able to parse request body as JSON
    * direct express instance to use public folder as static

* connect mongoose to mongo DB

* configure backend server routes
    * GET scrape route
        * axios GET http://www.#.com/, then promise response
            * declare variable $ & initialize cheerio to load response data
            * loop for target html element & save into results, a new empty object
                * declare new obj variable to store scraped data.

                * Select each html element we want to target from html body within the response data & loop for each element within response.

                * $('selector').each((i, element) => { 
                     var title = $(element).children().text();
                    var link = $(element).find("a").attr("href");
                    });

                    * Headline - the title of the article
                    * Summary - a short summary of the article
                    * URL - the url to the original article
                    * thumbnail jpg - from article

                * conditional to confirm there's valid data. if valid, then push object keys & values into an array.

                * console obj.

                * create new Article Model in database with the results obj, then console log successfully obj, catch errror
                
        * send a complete message to the client

* server route to GET all articles from db
    * grab all documents in Articles collection in db, then send json db results back to client, & catch send json of any errors

* server route to GET article by id & populate with any notes associated with article id
    * findOne id in db with id passed from req.params
        * populate with all notes associated with it
        * then if successfully send json results back to frontend
        * catch errror & send back err as json

* server route POST for saving/updating Article's associated Note
    * db create new Note Model with req.body passed from frontend client
        * then if dbNote successfully created, find one & update Article by id that was passed from req.params Update Article to be associated with new Note.
        * findOneAndUpdate returns a promise so chain another .then which sends query results & catches error

<!--  -->
<!-- mongoJS psudo -->
* require dependencies
    * cheerio - parsing HTML & finding html elements.
    * axios for front end ajax calls.
    * express - server
    * mongojs - node library for mongodb

* declare variable PORT for heroku or localhost 

* declare variable app & initialize instance of express app server.

* start express app to listen for http requests

* configure database by creating new variables that hold references to databaseUrl & collections.

* connect mongojs to db variables & use .on() to handle errors.

* Declare express app server routes
    * GET: / - send index
    * GET: /all - all returned json data
    * GET: /https://www.#.com
    * GET: /find/:id
    * POST: /update/:id
    * GET: /delete/:id
    * GET: /clearall

 # GET /https://www.#.com
    * axios get method to request html body from news site, then returns a response a string from news site as a promise, and add catch for any errors.

    * declare new variable $ that references cheerios selector commands. initialize variable with html body from axios's response by loading the HTML into cheerio and save it to a variable.

    * declare new array variable to store scraped data.

    * Select each html element we want to target from html body within the response data & loop for each element within response.

        * $('selector').each((i, element) => { 
            var title = $(element).children().text();
            var link = $(element).find("a").attr("href");
            });

        * Headline - the title of the article

        * Summary - a short summary of the article

        * URL - the url to the original article

        * thumbnail jpg - from article

    * conditional to confirm there's valid data. if valid, then push object keys & values into an array.

    * console array.

    * insert valid scraped data to database

    * confirm data was saved in mongo database with robo3t


## App Functionality
The app should scrape stories from a news outlet of your choice and display them for the user. Each scraped article should be saved to your application database. At a minimum, the app should scrape and display the following information for each article:

     * Headline - the title of the article

     * Summary - a short summary of the article

     * URL - the url to the original article

     * Feel free to add more content to your database (photos, bylines, and so on).

  2. Users should also be able to leave comments on the articles displayed and revisit them later. The comments should be saved to the database as well and associated with their articles. Users should also be able to delete comments left on articles. All stored comments should be visible to every user.

### Tips

* Go back to Saturday's activities if you need a refresher on how to partner one model with another.

* Whenever you scrape a site for stories, make sure an article isn't already represented in your database before saving it; Do not save any duplicate entries.

* Don't just clear out your database and populate it with scraped articles whenever a user accesses your site.

  * If your app deletes stories every time someone visits, your users won't be able to see any comments except the ones that they post.

### Helpful Links

* [MongoDB Documentation](https://docs.mongodb.com/manual/)
* [Mongoose Documentation](http://mongoosejs.com/docs/api.html)
* [Cheerio Documentation](https://github.com/cheeriojs/cheerio)
