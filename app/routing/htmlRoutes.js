var path = require("path");



module.exports = function (app){
   

    app.get("/", function(req,res){
        res.sendFile(path.join(__dirname,"../public/index.html"));
    });

    app.get("/admin", function(req,res){
        // res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
        res.sendFile(path.join(__dirname,"../public/admin.html"));
    });

};