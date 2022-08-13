const mongoose = require("mongoose");
const morgan = require("morgan");
const Joi = require("joi");
const genres = require("./routes/api/genres");
const home = require("./routes/home/home");
const express = require("express");
const app = express();
// import the routes

app.use("/", home);
app.use("/api/genres", genres);

mongoose
  .connect("mongodb://localhost/courses")
  .then(() => console.log("connected to mongodb"))
  .catch((error) => console.log(error));

app.use(express.json());
app.use(express.static("public"));
// use template engine
// express will internally load The PUG module, no nedd to require it
app.set("view engine", "pug");
// other settings, only if you want to ovewrite the past template
app.set("views", "./views");

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  console.log("morgan enabled");
}

const port = process.env.Port || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
