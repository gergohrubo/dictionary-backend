const { Router } = require("express");
const Entry = require("./model");
const dotenv = require("dotenv");

dotenv.config();
const router = new Router();

router.get("/entry", async (req, res, next) => {
  try {
    const movies = await Entry.find({}, function(err, docs) {
      if (!err) { 
          console.log(docs);
          process.exit();
      }
      else {
          throw err;
      }
  });
    res.send(movies);
  } catch (error) {
    next(error);
  }
});

router.post("/movie", async (req, res, next) => {
  try {
    const { category, searchString, tvShow, movie } = req.body;
    const { limit = 10, offset = 0 } = req.query;

    if (!tvShow && !movie) {
      res.send({
        count: 0,
        rows: []
      });
    }

    const queryObject = category.length > 0 ? { [category]: searchString } : {};

    const type =
      tvShow === movie ? {} : tvShow ? { type: "TV Show" } : { type: "Entry" };

    const movies = await Entry.findAndCountAll({
      limit,
      offset,
      where: { ...queryObject, ...type }
    });
    res.send(movies);
  } catch (error) {
    next(error);
  }
});

router.get("/movie/:id", async (req, res, next) => {
  try {
    const movie = await Entry.findByPk(req.params.id);
    const imdbRes = await imdb.get(
      { name: movie.title },
      { apiKey: process.env.IMDB_API_KEY }
    );
    const movieObject = movie.toJSON();
    movieObject["poster"] = imdbRes.poster;
    res.send(movieObject);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
