var friends = require("../data/friends.js");


module.exports = function(app){
    var bodyParser = require("body-parser");
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    app.get("/api/register", function(req,res){
        res.json(friends.friendsList);
    });
    
    app.post("/api/register", function(req,res){
        console.log(req.body);
        var newUser = new friends.Friend(req.body.name,req.body.photo,req.body.email);
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
        res.json({"message":"Registered!"});
    });

};