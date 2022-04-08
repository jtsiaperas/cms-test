var path = require("path");


// req.isAuthenticated is provided from the auth router
module.exports = function (app){
    const { auth } = require('express-openid-connect');

    const config = {
      authRequired: true,
      auth0Logout: true,
      secret: process.env.SECRET || "Pjmgqokja6_SSFVy0qOXnWaExlp4WSMp5urN1MwtTinUrble69KxAZBb7eqOuMUJ",
      baseURL: 'http://localhost:3000',
      clientID: 'iQ7y6Vj496fwTmUaARdE1CVDmt0f2BaY',
      issuerBaseURL: 'https://odakotalogin.auth0.com'
    };
    
    // auth router attaches /login, /logout, and /callback routes to the baseURL
    //app.use(auth(config));

    app.get("/", function(req,res){
        //res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
        res.sendFile(path.join(__dirname,"../public/index.html"));
    });

    app.get("/admin", function(req,res){
        res.sendFile(path.join(__dirname,"../public/admin.html"));
    });

};