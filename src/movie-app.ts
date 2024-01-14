import express from "express";
import { TMDBInterface } from "./TMBDMovie";

export type Movie = {
  id: number;
  name: string;
  votes: number;
  tmdbId: number;
};

export function createMovieApp(movies: Movie[], tmdb?: TMDBInterface) {
  const app = express();
  app.post("/movie/1234/vote", (req, res) => res.send());
  app.get("/movie/:movieId", async (req, res) => {
    const maybeMovie = movies.find(
      (movie) => movie.id === parseInt(req.params.movieId)
    );

    if (!maybeMovie) {
      res.send();
      return;
    }

    const tmdbMovie = await tmdb?.getMovie(maybeMovie?.tmdbId);

    const { id, name, votes } = maybeMovie;

    res.json({ id, name, votes, tmdbRating: tmdbMovie?.vote_average });
  });
  return app;
}
