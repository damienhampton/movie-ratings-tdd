import sinon from "sinon";
import { Movie } from "./movie-model";
import { MovieServiceInterface } from "./movie-service";

class DumbMovieService implements MovieServiceInterface {
  async addVote(movieId: number): Promise<void> {
    return;
  }

  async getMovie(movieId: number): Promise<Movie | undefined> {
    if (movieId === 5678) {
      return {
        id: 5678,
        name: "The BDD movie",
        votes: 4,
        tmdbRating: 5.4,
      };
    } else {
      return {
        id: 1234,
        name: "The TDD movie",
        votes: 5,
        tmdbRating: 6.4,
      };
    }
  }
}

class ArrayMovieService implements MovieServiceInterface {
  private movies = [
    {
      id: 5678,
      name: "The BDD movie",
      votes: 4,
      tmdbRating: 5.4,
    },
    {
      id: 1234,
      name: "The TDD movie",
      votes: 5,
      tmdbRating: 6.4,
    },
  ];
  async addVote(movieId: number): Promise<void> {
    return;
  }

  async getMovie(movieId: number): Promise<Movie | undefined> {
    return this.movies.find((movie) => movie.id === movieId);
  }
}

function movieServiceContractTests(service: MovieServiceInterface) {
  describe(`${service.constructor.name} movie service`, () => {
    context("add vote", () => {
      context("movie 1234", () => {
        it("should accept vote", async () => {
          expect(await service.addVote(1234)).to.be.undefined;
        });
      });
    });
    context("getMovie", () => {
      context("movie 1234", () => {
        it("should get details", async () => {
          expect(await service.getMovie(1234)).to.deep.equal({
            id: 1234,
            name: "The TDD movie",
            votes: 5,
            tmdbRating: 6.4,
          });
        });
      });
      context("movie 5678", () => {
        it("should get details", async () => {
          expect(await service.getMovie(5678)).to.deep.equal({
            id: 5678,
            name: "The BDD movie",
            votes: 4,
            tmdbRating: 5.4,
          });
        });
      });
    });
  });
}

movieServiceContractTests(new DumbMovieService());
movieServiceContractTests(new ArrayMovieService());
