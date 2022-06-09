const path = require("path");
const express = require("express");

const port = 8001;
const app = express();

const todoItems = ["my 1 todo", "my 2 todo", "my 3 todo"];

app.use(express.static(path.resolve(__dirname, "./public")));

app.get("/todos", (req, res) => {
  res.send({
    todoItems,
  });
});

app.post("/todo", (req, res) => {
  // impl.
});

app.listen(port, () => {
  console.log("server started at :" + port);
});
