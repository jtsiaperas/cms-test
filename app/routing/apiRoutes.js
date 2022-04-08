

module.exports = function(app){
    var bodyParser = require("body-parser");
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    app.get("/api/user", function(req,res){
        res.json(friends.friendsList);
    });
    
    app.post("/api/user", function(req,res){
        console.log(req.body);
        retuurn 
        res.json(res.body);
    });

};