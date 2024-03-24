import { TMDBContractTests } from "./tmdb-movie-contract.spec";
import { TMDBInterface, TMDBMovie } from "./tmdb-movie";

class TMDB implements TMDBInterface {
  async getMovieDetails(id: number): Promise<TMDBMovie | undefined> {
    const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "Bearer <<ADD BEARER TOKEN>>",
      },
    };

    try {
      const response = await fetch(url, options);
      if (response.status !== 200) {
        return undefined;
      }
      return response.json();
    } catch (e) {
      return undefined;
    }
  }
}

TMDBContractTests("Inmemory TMDB movie", (ids) => {
  return new TMDB();
});
