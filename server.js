// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const mysql = require('mysql');
const app = express();
const mongoose = require("mongoose");
const bodyParser= require("body-parser");
const cors = require("cors");
//require('./app/routing/apiRoutes')(app);
require('./app/routing/htmlRoutes')(app);
require('dotenv').config();

app.use(cors());
// Sets up the Express App
// =============================================================
// const { auth } = require('express-openid-connect');

// const config = {
// authRequired: true,
// auth0Logout: true,
// secret: process.env.SECRET,
// baseURL: 'http://localhost:3000',
// clientID: 'iQ7y6Vj496fwTmUaARdE1CVDmt0f2BaY',
// issuerBaseURL: 'https://odakotalogin.auth0.com'
// };

// // auth router attaches /login, /logout, and /callback routes to the baseURL
// app.use(auth(config));
function authentication(req, res, next) {
    var authheader = req.headers.authorization;
    
    if(req.path == "/api/user")
    {
        
        if (!authheader) {
            var err = new Error('You are not authenticated!');
            res.setHeader('WWW-Authenticate', 'Basic');
            err.status = 401;
            return next(err)
        }
 
        var auth = new Buffer.from(authheader.split(' ')[1],
        'base64').toString().split(':');
        var user = auth[0];
        var pass = auth[1];
 
        if (user == 'admin' && pass == 'password') {
 
            // If Authorized user
            next();
        } else {
            var err = new Error('You are not authenticated!');
            res.setHeader('WWW-Authenticate', 'Basic');
            err.status = 401;
            return next(err);
        }
    }
    else{
        next();
    }
 
}
app.use(authentication);

const port = process.env.PORT || 3000;


const db = require("./models");

//set mongoDB for local or heroku
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/cms-test";

// Use body-parser for handling form submissions
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}


app.get("/api/user/", function(req,res){

	db.User.find()
	.then(users => res.json(users))
	.catch(err => res.json(err));
});


app.post("/api/user", function(req,res){
	db.User.create(req.body)
	.then(user => res.json(user))
	.catch(err => res.json(err));

  
        // using Twilio SendGrid's v3 Node.js Library
        // https://github.com/sendgrid/sendgrid-nodejs
        const sgMail = require('@sendgrid/mail')
        sgMail.setApiKey(process.env.SENDGRID_API_KEY)
        const msg = {
            to: req.body.email, // Change to your recipient
            from: 'jatsiaperas@gmail.com', // Change to your verified sender
            subject: 'M1 interactive registration',
            text: 'has been completed',
            html: '<strong>has been completed</strong>',
        }
        sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent')
        })
        .catch((error) => {
            console.error(error)
        })
});


mongoose.connect(MONGODB_URI).then(
    () => {
        console.log("mongodb connected");
        }
    ).catch(err => console.log(err));

app.listen(port, function() {
    console.log("App listening on PORT " + port);
});