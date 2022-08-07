const express = require("express");
const router = express.Router();

const genres = [
  { name: "action", id: 1 },
  { name: "thriller", id: 2 },
  { name: "mystery", id: 3 },
];

router.get("/api/genres", (req, res) => {
  res.send(genres);
});

router.get("/:id", (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  //if not existing, return 404
  if (!genre)
    return res.status(404).send("The genre with the given id was not found");

  res.send(genre);
});

router.post("/", (req, res) => {
  const { error } = validateRequest(req.body);
  if (error) return res.status(400).send(error.details[0].message); //400 bad request

  const genre = {
    id: genres.length + 1,
    name: req.body.name,
  };

  genres.push(genre);
  res.send(genre);
});

router.put("/:id", (req, res) => {
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

router.delete("/:id", (req, res) => {
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

module.exports = router;
