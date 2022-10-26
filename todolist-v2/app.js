const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const express = require("express");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// Mongoose DB and item schema creation:
mongoose.connect("mongodb://localhost:27017/todolistDB");

const itemsSchema = {
  name: String
};

const Item = mongoose.model("Item", itemsSchema);

// Default test items:
const item1 = new Item ({
  name: "Cooking",
});
const item2 = new Item ({
  name: "Study",
});
const item3 = new Item ({
  name: "Fawkner",
});

const defaultItems = [item1, item2, item3];

const listSchema = {
  name: String,
  items: [itemsSchema],
};

const List = mongoose.model("List", listSchema);


//
app.get("/", function(req, res) {
  
  Item.find({}, function(err, foundItems){
    
    if(foundItems.length === 0){
      Item.insertMany(defaultItems, function(err){
        if(err){
          console.log(err);
        }else{
          console.log("Successfuly saved default items to our DB. ");
        };
      });
      res.redirect("/");
    }else{
      res.render("list", {listTitle: "Today", newListItems: foundItems});
    };
  });
});

app.get("/:customListName", function(req, res){
  const customListName = req.params.customListName;

  List.findOne({name: customListName}, function(err, foundList){
    if(!err){
      if(!foundList){
        console.log("DNE.");
      }else{
        console.log("Exist.")
      };
    };
  });

  const list = new List({
    name: customListName,
    items: defaultItems,
  });
  list.save();
});


app.post("/", function(req, res){

  const itemName = req.body.newItem;
  const item = new Item({
    name: itemName,
  });
  item.save();
  res.redirect("/");
});

app.post("/delete", function(req, res){
  const checkedItemId = req.body.checkbox;

  Item.findByIdAndRemove(checkedItemId, function(err){
    if(!err){
      console.log("Successfuly deleted checked item. ");
    };
  });
  res.redirect("/");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
