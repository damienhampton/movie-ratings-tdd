import express from "express";

export type Movie = {
  id: number;
  name: string;
  votes: number;
  tmdbRating: number;
};

export function createMovieApp(movies: Movie[]) {
  const app = express();
  app.post("/movie/1234/vote", (req, res) => res.send());
  app.get("/movie/:movieId", (req, res) => {
    res.json(movies.find((movie) => movie.id === parseInt(req.params.movieId)));
  });
  return app;
}
