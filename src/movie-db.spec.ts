import { movieDBContractTests } from "./movie-db-contract.spec";
import { MovieDBInterface } from "./movie-db";
import { MovieDBRecord } from "./movie-model";

class InmemoryMovieDB implements MovieDBInterface {
  constructor(private movies: MovieDBRecord[]) {}

  async getMovie(movieId: number): Promise<MovieDBRecord | undefined> {
    return this.movies.find((movie) => movie.id === movieId);
  }
}

movieDBContractTests(
  "InmemoryMovieDB",
  (params) => new InmemoryMovieDB(params)
);
