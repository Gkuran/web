const bodyParser = require("body-parser");
const request = require("request");
const express = require("express");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
    var firstName = req.body.fName;
    var lastName = req.body.lName;
    var email = req.body.email;

    console.log(firstName, lastName, email);
});

app.listen(3000, function(){
    console.log("\nServer running on port 3000. ");
});