export type TMDBMovie = {
  id: number;
  vote_average: number;
};

export interface TMDBInterface {
  getMovieDetails(getMovieDetails: number): Promise<TMDBMovie | undefined>;
}
