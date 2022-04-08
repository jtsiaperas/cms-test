// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var mysql = require('mysql');
var app = express();

require('./app/routing/apiRoutes')(app);
require('./app/routing/htmlRoutes')(app);

// Sets up the Express App
// =============================================================

var port = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing

var db = mysql.createConnection({
    host:"localhost",
    user:"mysql",
    password:"mysqlpass1!"
})
db.connect(function(err){
    if(err) throw err;
    console.log("Connected to mysql");
    con.query("CREATE DATABASE mydb", function (err, result) {
        if (err) throw err;
        console.log("Database created");
    });
})

app.listen(port, function() {
    console.log("App listening on PORT " + port);
});

