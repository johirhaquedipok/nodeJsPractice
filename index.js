const mongoose = require("mongoose");
const morgan = require("morgan");
const Joi = require("joi");
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public"));

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("connected to monogo db"))
  .then((error) => console.log(error));

// create schema with the help of mongoose
const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

// mongoose model
const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "Angular Course",
    author: "Jo",
    tags: ["Angular", "Frontend"],
    isPublished: "true",
  });

  const result = await course.save();
  console.log(result);
}

// createCourse();

// find data from the database
async function getCourse() {
  /* comparision operator
    *eq(equal)
    *ne(not equal)
    *gt(greater than)
    *gte(greater than or equal)
    *lt(less than)
    *lte(less than or equla)
    *in(less than or equla)
    *nin(not in)

  */

  /* 
    or and and method query data from db
    *or 
    *and
    */

  /* 
    pattern

    --- find anything that starts with the word.
    find({/^word/ })

    --- find anything that ends with the word.(case sensitive)
    find({/word$/ })

    --- find anything that ends with the word.(case insensitive)
    find({/word$/i })

    --- find any word that contains the word anywhere.(case sensitive)
    find({author: /.*word*./})

    --- find any word that contains the word anywhere.(case insensitive)
    find({author: /.*word*./i})
    */
  /* count()
    return only number of documents that are matched with the queries
   */
  const result = await Course.find({ author: "Jo", isPublished: true })
    .limit(10)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 });
  console.log(result);
}

getCourse();

// import the routes
const genres = require("./routes/api/genres");
const home = require("./routes/home/home");

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
