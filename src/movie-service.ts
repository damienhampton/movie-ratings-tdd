import { Movie } from "./movie-model";
import { MovieDBInterface } from "./movie-db";
import { TMDBInterface } from "./tmdb-movie";

export interface MovieServiceInterface {
  getMovie(movieId: number): Promise<Movie | undefined>;
  addVote(movieId: number): Promise<void>;
}

export class MovieService implements MovieServiceInterface {
  constructor(private moviedb: MovieDBInterface, private tmdb: TMDBInterface) {}

  async addVote(movieId: number): Promise<void> {
    return;
  }

  async getMovie(movieId: number): Promise<Movie | undefined> {
    const maybeMovie = await this.moviedb.getMovie(movieId);
    if (maybeMovie === undefined) {
      return;
    }
    const tmdbMovie = await this.tmdb.getMovieDetails(maybeMovie.tmdbId);
    return {
      id: movieId,
      name: maybeMovie.name,
      votes: maybeMovie.votes,
      tmdbRating: tmdbMovie?.vote_average,
    };
  }
}
