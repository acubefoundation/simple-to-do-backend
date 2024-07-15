const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ToDoModel = require("./model/toDoModel");
const app = express();
const port = 8080;

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

/////////start the server//////////
function connection() {
  try {
    app.listen(port);
    mongoose.connect("mongodb://localhost:27017/to-do");
    console.log(
      `sucxcesfully connected to the database and server running on port  http://localhost:${port}/`
    );
  } catch (error) {
    console.log(error);
  }
}

/////////////requests and database related

app.post("/add-todo", (req, res) => {
  const { toDo } = req.body;
  console.log(toDo);
  ToDoModel.create({
    todo: toDo,
  })
    .then((result) =>
      res.json({
        data: result,
        message: "succesfullt inserted to the database",
      })
    )
    .catch((err) => res.json(err.message));
});

app.get("/", (req, res) => {
  res.send("this is test page for the backend");
});

app.get("/get-all", (req, res) => {
  ToDoModel.find()
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.put("/update-status/:id", (req, res) => {
  const { id } = req.params;
  ToDoModel.findByIdAndUpdate({ _id: id }, { status })
    .then((result) => res.json(result))
    .catch((error) => res.json(error));
});

app.delete("/delete-task/:id", (req, res) => {
  const { id } = req.params;

  ToDoModel.findByIdAndDelete({ _id: id })
    .then((result) => res.json(result))
    .catch((error) => res.json(error));
});

connection();
