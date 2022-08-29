const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
var corsOptions = {
  origin: "*"
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); 
app.all("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.get("/", (req, res) => {
  res.send(JSON.stringify({ message: "Hello World" }));
});
app.listen(port);

