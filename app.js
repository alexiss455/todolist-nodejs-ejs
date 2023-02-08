const express = require("express"); 
const bodyParser = require("body-parser");
const app = express();
const _ = require("lodash");
const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
mongoose.connect("mongodb+srv://Alexiess:gagoka45@alexiess.9vhaijd.mongodb.net/TodoList", { useNewUrlParser: true, useUnifiedTopology: true });
// collections for items
const itemSchema = new mongoose.Schema ({
    name: String
});
const Item = mongoose.model("Item" , itemSchema);

// collection for list
const listSchema = new mongoose.Schema({
    name: String,
    itmes: [itemSchema]
});
const List = mongoose.model("List",listSchema);




const item1  = new Item({
    name: "Welcome Todolist"
});
const item2  = new Item({
    name: "Hit the + button to add your list"
});
const item3  = new Item({
    name: "hit the - button to delete your finish list"
});
const foudItems = [item1, item2, item3];

const date = require(__dirname + "/date.js");
let day = date.dayy();
let weeks = date.week();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){

Item.find({}, function(err, foudItems1){

    if (foudItems === 0){
        Item.insertMany({foudItems},function(err){
            if (err){
                console.log(err);
            }else{
                console.log("SUCCESS ADD")
            }
        });
        res.redirect("/");
    }else{
        res.render("list", {listtitle: day, week: weeks, list: foudItems1});
    } 
});
});

app.post("/", function(req, res){
let itemName = req.body.newItem;
let listCustomName = req.body.lists;

const newItem1 = new Item ({
    name: itemName
});

if (listCustomName === day){
    newItem1.save();
    res.redirect("/");
}else{
    List.findOne({name: listCustomName}, function(err, foundList){
        foundList.itmes.push(newItem1);
        foundList.save();
        res.redirect("/"+foundList.name);
    });
}
});


app.post("/delete", function(req, res){
    var chck = req.body.checkbox1;
    var listedItems = req.body.listedname;

    if(listedItems === day){
        Item.findByIdAndDelete({_id: chck},function(err){
            if (!err){
                console.log("SUCCESS");
                res.redirect("/")
            }else{
                console.log("Not Deleted")
            }
        });
    }else{
      List.findOneAndUpdate({name: listedItems}, {$pull: {itmes:{_id: chck}}}, function(err, foundList){
        if(!err){
            res.redirect("/"+listedItems);
        }else{
            console.log(foundList);
        }
      });   
    }
});


app.get("/:customList", function(req, res){
    var listName = _.capitalize(req.params.customList);

    List.findOne({name: listName}, function(err, foundlist){
        if(!err){
            if(!foundlist){
                var lists = new List({
                    name: listName,
                    itmes: foudItems
                });
                lists.save();
                res.redirect("/" + listName);
            }else{
                res.render("list", {listtitle: foundlist.name, week: weeks, list: foundlist.itmes});
            }
        }
    });
});

app.listen(3000, function(){
    console.log("server is running in port 3000");
});

