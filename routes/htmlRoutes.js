// Dependencies
// =============================================================
var path = require("path");

// HTML Routes
// =============================================================

module.exports = function(app) {

    app.get("/", function(req, res) {
        res.render("index");
      });
      
    //   // index route loads home.html
    // app.get("/", function(req, res) {
    //     res.sendFile(path.join(__dirname, "../public/index.html"));
    // });
};