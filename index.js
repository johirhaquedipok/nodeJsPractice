const morgan = require("morgan");
const Joi = require("joi");
const express = require("express");
const app = express();

// import the routes
const genres = require("./routes/api/genres");
const home = require("./routes/home/home");

app.use(express.json());
app.use(express.static("public"));
app.use("/", home);
app.use("/api/genres", genres);
// use template engine
// express will internally load The PUG module, no nedd to require it
app.set("view engine", "pug");
// other settings, only if you want to ovewrite the past template
app.set("views", "./views");

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  console.log("morgan enabled");
}

const port = 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
