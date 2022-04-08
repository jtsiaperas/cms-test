// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const mysql = require('mysql');
const app = express();
const cors = require('cors');
const mongoose = require("mongoose");

require('./app/routing/apiRoutes')(app);
require('./app/routing/htmlRoutes')(app);
require('dotenv').config();

app.use(cors());
// Sets up the Express App
// =============================================================

const port = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
const db = require("./models");

//set mongoDB for local or heroku
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/cms-test";



// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}


app.get("/api/user/:id", /*authCheck,*/ function(req,res){

	db.User.findOne({_id: req.params.id})
	.then(user => res.json(user))
	.catch(err => res.json(err));
});


app.post("/api/user", /*authCheck,*/ function(req,res){
  let user = req.body.user.toString();
  console.log(user);

	db.User.findOneAndUpdate({_id: user},{_id: user},{upsert: true})
	.then(user => res.json(user))
	.catch(err => res.json(err));
});

mongoose.connect(MONGODB_URI).then(
    () => {
        console.log("mongodb connected");
        }
    ).catch(err => console.log(err));

app.listen(port, function() {
    console.log("App listening on PORT " + port);
});

