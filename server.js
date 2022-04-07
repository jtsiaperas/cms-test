// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var app = express();

require('./app/routing/apiRoutes')(app);
require('./app/routing/htmlRoutes')(app);

// Sets up the Express App
// =============================================================

var port = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing



app.listen(port, function() {
    console.log("App listening on PORT " + port);
});

