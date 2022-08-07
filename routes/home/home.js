const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  // send file using pug. while using pug file use Render function
  /* rende takes two parameter.  the pug file name and second is object of pug files values */
  res.render("index", { title: "my express pug file", message: "hello world" });
});

module.exports = router;
