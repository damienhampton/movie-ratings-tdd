import { MovieDBRecord } from "./movie-model";

export interface MovieDBInterface {
  getMovie(movieId: number): Promise<MovieDBRecord | undefined>;
}
