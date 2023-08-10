const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
// const postRouter = require("./routes/post.router");
const post = require("./routes/post");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const bodyParser = require("body-parser");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

var allowlist = ["http://localhost:8910", "http://localhost:8911"];
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (allowlist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true };
  } else {
    corsOptions = { origin: false };
  }
  callback(null, corsOptions);
};

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });
app.use(cors(corsOptionsDelegate));

const port = process.env.URL || 8000;

app.use(express.json());
app.use("/post", post);

app.listen(port, () => {
  console.log(`server is runing on port : ${port}`);
});
