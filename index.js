const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const path = require("path");
const dotenv = require('dotenv');


require("dotenv").config();
app = express();
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
app.use(express.static(path.join(__dirname, "public"))); //linking stylesheet
app.use(bodyParser.urlencoded({ extended: true }));

let expenditure;

app.get("/", function (req, res) {
  message = "";
  res.sendFile("views/about.html", {
    root: path.join(__dirname, "./"),
  });
});

app.get("/index", function (req, res) {
  message = "";
  res.sendFile("views/index.html", {
    root: path.join(__dirname, "./"),
  });
});

app.get("/login", function (req, res) {
  logA = false;
  logU = false;
  res.sendFile("views/login.html", {
    root: path.join(__dirname, "./"),
  });
});

app.post("/login",function(req,res){
    res.redirect("/index");
});

app.get("/signup", function (req, res) {
  res.sendFile("views/signup.html", {
    root: path.join(__dirname, "./"),
  });
});

app.post("/signup",function(req,res){
    res.redirect("/index");
});

app.get("/summary", function(req, res){
    res.render(__dirname + "/views/summary.html", {expenditure:expenditure});
  });

app.post("/",function(req,res){
       var expenses=req.body.expense;
       var ArrayOfExpenses = expenses.map(Number);
       expenditure=ArrayOfExpenses.reduce(function(acc, val) { return acc + val; }, 0);

       res.redirect("/summary");
    
});


app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
