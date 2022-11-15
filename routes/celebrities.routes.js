const Celeb = require("../models/Celebrity.model");

// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here
router.get("/celebrities/create", (req, res, next) => {
  res.render("celebrities/new-celebrity");
});

router.post("/celebrities/create", (req, res, next) => {
  let newCeleb = req.body;
  Celeb.create({
    name: newCeleb.name,
    occupation: newCeleb.occupation,
    catchPhrase: newCeleb.catchPhrase,
  })
    .then((createdCeleb) => {
      console.log("new celeb created: ", createdCeleb);
      res.redirect("/celebrities");
    })
    .catch(() => res.render("celebrities/new-celebrity"));
});

router.get("/celebrities", (req, res, next) => {
  Celeb.find()
    .then((celebs) => {
      console.log(celebs);
      res.render("celebrities/celebrities", { celebs });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
