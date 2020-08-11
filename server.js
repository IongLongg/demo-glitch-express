// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();
const bodyParser = require('body-parser')

var todosList = [
  {id : 1, name: "Eat"},
  {id : 2, name: "Sleep"},
  {id : 3, name: "Basketball"},
  {id : 4, name: "Code"}
];

app.set("view engine", "pug");
app.set("views", "./views");

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (req, res) => {
  res.send("I love CodersX");
});

app.get("/todos", (req, res) => {
  res.render("todos", {
    todosList : todosList
  });
});

app.get("/todos/search", (req, res) => {
  var q = req.query.q;
  var matchedList = todosList.filter(task => task.name.toLowerCase().indexOf(q.toLowerCase()) !== -1)
  
  res.render("todos", {
    todosList : matchedList
  })
})

app.get("/todos/create", (req,res) => {
  res.render("create")
})

app.post("/todos/create", (req, res) => {
  // res.send(req.body.task)
  var newTask = {
    id : Math.round(Math.random()*10000),
    name : req.body.task
  }
  todosList.push(newTask);
  res.redirect("/todos");
})

// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
