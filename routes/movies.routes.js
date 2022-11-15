const { render } = require("../app");
const Celeb = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here

router.get("/movies/create", (req, res, next) => {
  Celeb.find().then((celebs) => {
    res.render("movies/new-movie.hbs", { celebs });
  });
});

router.post("/movies/create", (req, res, next) => {
  let newMovie = req.body;
  Movie.create({
    title: newMovie.title,
    genre: newMovie.genre,
    plot: newMovie.plot,
    cast: newMovie.cast,
  })
    .then((createdMovie) => {
      console.log("new Movie created: ", createdMovie);
      res.redirect("/movies");
    })
    .catch(() => res.render("movies/new-movie"));
});


//iteration 7 i think
router.get("/movies", (req, res, next) => {
  Movie.find()
    .then((movies) => {
      console.log(movies);
      res.render("movies/movies", { movies });
    })
    .catch((err) => console.log(err));
});

//this is iteration 8 i think
router.get("/movies/:id", (req, res, next) => {
  let id = req.params.id;
  Movie.findById(id)
    .populate("cast")
    .then((foundMovie) => {
      res.render("movies/movie-details", foundMovie);
    })
    .catch((err) => console.log(err));
});

module.exports = router;
