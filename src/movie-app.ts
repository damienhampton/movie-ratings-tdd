import express from "express";
import { MovieServiceInterface } from "./movie-service";

export function createMovieApp(service: MovieServiceInterface) {
  const app = express();
  app.post("/movie/:movieId/vote", async (req, res) => {
    res.send(await service.addVote(parseInt(req.params.movieId)));
  });
  app.get("/movie/:movieId", async (req, res) => {
    res.json(await service.getMovie(parseInt(req.params.movieId)));
  });
  return app;
}
