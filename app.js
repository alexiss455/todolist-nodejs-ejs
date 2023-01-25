const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const items = [];
const worklist = [];

const date = require(__dirname + "/date.js");
let day = date.dayy();
let weeks = date.week();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
    res.render("list", {listtitle: day, week: weeks, list: items});
});

app.post("/", function(req, res){
 
let item = req.body.newItem;

if(req.body.lists === "Work list" ){
    worklist.push(item);
    res.redirect("/work");
}else{
    items.push(item);
    res.redirect("/");
}
});

app.get("/work", function(req, res){

    res.render("list", {listtitle: "Work list", week: weeks, list: worklist});
});

app.get("/about", function(req, res){

    res.render("about");
});

app.listen(3000, function(){
    console.log("server is running in port 3000");
});