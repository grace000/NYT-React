// Include Server Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var mongojs = require("mongojs");

// Require Click schema
var Article = require("./models/article");

// Create a new express app
var app = express();
// Sets an initial port. We'll use this later in our listener
var PORT = process.env.PORT || 3000;

// Run Morgan for Logging
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("./public"));

// -------------------------------------------------

// var db = mongoose.connection;
// mongoose.connect("mongodb://localhost/nycreact");

// // Mongojs configuration
// var databaseUrl = "nycreact";
// var collections = ["articles"];

// var db = mongojs(databaseUrl, collections);

// db.on("error", function(err) {
//   console.log("Mongoose Error: ", err);
// });

// db.once("open", function() {
//   console.log("Mongoose connection successful.");
// });

mongoose.Promise = Promise;

var dotenv = require('dotenv').config();

var uristring =

process.env.MONGODB_URI ||
'mongodb://localhost/nycreact';

mongoose.connection.openUri(uristring, function (err, res) {
  if (err) {
  console.log ('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
  console.log ('Succeeded connected to: ' + uristring);
  }
});

// -------------------------------------------------

// Main "/" Route. This will redirect the user to our rendered React application
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

// This is the route we will send GET all saved articles
app.get("/api/saved", function(req, res) {

  
  Article.find({}).sort([
    ['date', 'descending']
      ]).exec(function(err, doc) {
    if (err) {
      console.log(err);
    }
    else {
      res.send(doc);
    }
  });
  console.log("You visited the saved route!");
});

// This is the route we will send POST requests to save each article
app.post("/api/saved", function(req, res) {

  var newArticle = new Article({
      title: req.body.title,
      date: req.body.date,
      url: req.body.url
  });
  console.log(req.body);

  newArticle.save(function(err, doc){
    if (err) {
      console.log(err);
    }
    else {
      res.send(doc);
    }
  })
  console.log("You made a post request");
});


app.delete('/api/saved/:id', function(req, res){
    Article.deleteOne({_id: req.params.id}, 
      function(error, article){
        res.send({id: article._id});
    });
    console.log("you made delete request")
});

app.get("*", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

// -------------------------------------------------

// Starting our express server
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
