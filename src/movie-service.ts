import { Movie } from "./movie-model";

export interface MovieServiceInterface {
  getMovie(movieId: number): Promise<Movie | undefined>;
  addVote(movieId: number): Promise<void>;
}
