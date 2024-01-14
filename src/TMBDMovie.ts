export type TMBDMovie = {
  id: number;
  vote_average: number;
};

export interface TMDBInterface {
  getMovie(getMovie: any): Promise<TMBDMovie | undefined>;
}
