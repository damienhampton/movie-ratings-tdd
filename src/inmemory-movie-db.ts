import { MovieDBInterface } from "./movie-db";
import { MovieDBRecord } from "./movie-model";

export class InmemoryMovieDB implements MovieDBInterface {
  constructor(private movies: MovieDBRecord[]) {}

  async getMovie(movieId: number): Promise<MovieDBRecord | undefined> {
    return this.movies.find((movie) => movie.id === movieId);
  }
}
