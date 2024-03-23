import { MovieDBRecord } from "./movie-model";
import sinon from "sinon";
import { TMDBInterface, TMDBMovie } from "./tmdb-movie";
import { MovieDBInterface } from "./movie-db";
import { movieServiceContractTests } from "./movie-service-contract.spec";
import { MovieService } from "./movie-service";

// contract tests
movieServiceContractTests("MovieService", (params) => {
  const moviedb = <MovieDBInterface>{};
  moviedb.getMovie = async () => ({
    id: params.id,
    name: params.name || "",
    votes: params.votes || 0,
    tmdbId: 9999,
  });
  const tmdb = <TMDBInterface>{};
  tmdb.getMovieDetails = async () => ({
    id: 9999,
    vote_average: params.tmdbRating || 0,
  });
  return new MovieService(moviedb, tmdb);
});

// other tests!
describe("Movie Service", () => {
  context("getMovie 1234", () => {
    it("should retrieve details for movie", async () => {
      const moviedb = <MovieDBInterface>{};
      moviedb.getMovie = sinon
        .stub<[movieId: number], Promise<MovieDBRecord | undefined>>()
        .withArgs(1234)
        .resolves({
          id: 1234,
          name: "The TDD movie",
          votes: 5,
          tmdbId: 2345,
        });
      const tmdb = <TMDBInterface>{};
      tmdb.getMovieDetails = sinon
        .stub<[id: number], Promise<TMDBMovie | undefined>>()
        .withArgs(2345)
        .resolves({
          id: 2345,
          vote_average: 7.2,
        });

      const service = new MovieService(moviedb, tmdb);
      expect(await service.getMovie(1234)).to.deep.equal({
        id: 1234,
        name: "The TDD movie",
        votes: 5,
        tmdbRating: 7.2,
      });
      expect(moviedb.getMovie).to.have.been.calledOnceWith(1234);
      expect(tmdb.getMovieDetails).to.have.been.calledOnceWith(2345);
    });
  });
  context("getMovie 5678", () => {
    it("should retrieve details for movie", async () => {
      const moviedb = <MovieDBInterface>{};
      moviedb.getMovie = sinon
        .stub<[movieId: number], Promise<MovieDBRecord | undefined>>()
        .withArgs(5678)
        .resolves({
          id: 5678,
          name: "The BDD movie",
          votes: 4,
          tmdbId: 6789,
        });
      const tmdb = <TMDBInterface>{};
      tmdb.getMovieDetails = sinon
        .stub<[id: number], Promise<TMDBMovie | undefined>>()
        .withArgs(2345)
        .resolves({
          id: 2345,
          vote_average: 7.3,
        });
      const service = new MovieService(moviedb, tmdb);
      expect(await service.getMovie(5678)).to.deep.equal({
        id: 5678,
        name: "The BDD movie",
        votes: 4,
        tmdbRating: 7.3,
      });
      expect(moviedb.getMovie).to.have.been.calledOnceWith(5678);
      expect(tmdb.getMovieDetails).to.have.been.calledOnceWith(6789);
    });
  });
});
