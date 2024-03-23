import { TMDBContractTests } from "./tmdb-movie-contract.spec";
import { TMDBInterface, TMDBMovie } from "./tmdb-movie";

class InmemoryTMDB implements TMDBInterface {
  constructor(private movies: { vote_average: number; id: number }[]) {}

  async getMovieDetails(id: number): Promise<TMDBMovie | undefined> {
    return this.movies.find((movie) => movie.id === id);
  }
}

TMDBContractTests("Inmemory TMDB movie", (ids) => {
  return new InmemoryTMDB(ids.map((id) => ({ id, vote_average: 5 })));
});
