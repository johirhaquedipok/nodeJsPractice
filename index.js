const morgan = require("morgan");
const Joi = require("joi");
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.static("public"));
// use template engine
// express will internally load The PUG module, no nedd to require it
app.set("view engine", "pug");
if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  console.log("morgan enabled");
}
app.get("/", (req, res) => {
  res.send("hello world");
});

const genres = [
  { name: "action", id: 1 },
  { name: "thriller", id: 2 },
  { name: "mystery", id: 3 },
];

app.get("/api/genres", (req, res) => {
  res.send(genres);
});

app.get("/api/genres/:id", (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  //if not existing, return 404
  if (!genre)
    return res.status(404).send("The genre with the given id was not found");

  res.send(genre);
});

app.post("/api/genres", (req, res) => {
  const { error } = validateRequest(req.body);
  if (error) return res.status(400).send(error.details[0].message); //400 bad request

  const genre = {
    id: genres.length + 1,
    name: req.body.name,
  };

  genres.push(genre);
  res.send(genre);
});

app.put("/api/genres/:id", (req, res) => {
  // Look up the genre
  const genre = genres.find((c) => c.id === parseInt(req.params.id));
  //if not existing, return 404
  if (!genre)
    return res.status(404).send("The genre with the given id was not found"); // not found

  //Validate

  const { error } = validateRequest(req.body);
  // if invalid, return 400 -- bad request
  if (error) return res.status(400).send(error.details[0].message);
  console.log(genre);
  // update genre
  genre.name = req.body.name;
  // return the updated genre
  res.send(genre);
});

app.delete("/api/genres/:id", (req, res) => {
  // Look up the  genre
  const genre = genres.find((g) => g.id === parseInt(req.params.id));

  //if not existing, return 404
  if (!genre)
    return res.status(404).send("The genre with the given id was not found");

  // Delete

  const index = genres.findIndex(genre);
  genres.splice(index, 1);

  // Return the same genre
  res.send(genres);
});

// validate body request function
const validateRequest = (genre) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return schema.validate(genre);
};
const port = 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
