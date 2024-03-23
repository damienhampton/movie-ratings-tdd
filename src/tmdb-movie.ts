export type TMDBMovie = {
  id: number;
  vote_average: number;
};

export interface TMDBInterface {
  getMovieDetails(id: number): Promise<TMDBMovie | undefined>;
}
