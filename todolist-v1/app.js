const date = require(__dirname + "/date.js");
const bodyParser = require("body-parser");
const express = require("express");

let items = [];
let workItems = [];
const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// Root
app.get("/", function(req, res){
    let day = date();
    res.render("list", {listTitle: day, newListItems: items, route: "/"});
});

app.post("/", function(req, res){
    let item = req.body.newItem
    items.push(item);
    res.redirect("/");
});

// Work List
app.get("/work", function(req, res){
    res.render("list", {listTitle: "Work List", newListItems: workItems, route: "/work"});
});

app.post("/work", function(req, res){
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
});

// Listen
app.listen(3000, function(){
    console.log("\nServer running on port 3000.");
});