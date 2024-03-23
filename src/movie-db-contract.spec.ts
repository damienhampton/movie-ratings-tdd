import { MovieDBInterface } from "./movie-db";
import { MovieDBRecord } from "./movie-model";

export function movieDBContractTests(
  name: string,
  createTestMovieDB: (params: MovieDBRecord[]) => MovieDBInterface
) {
  describe(`${name}: movie db contract tests`, () => {
    context("getMovie", () => {
      const movieDb = createTestMovieDB([
        {
          id: 1234,
          name: "The TDD movie",
          votes: 5,
          tmdbId: 2345,
        },
        {
          id: 5678,
          name: "The BDD movie",
          votes: 4,
          tmdbId: 6789,
        },
      ]);
      context("with movieId 1234", () => {
        it("should return correct movie", async () => {
          expect(await movieDb.getMovie(1234)).to.deep.equal({
            id: 1234,
            name: "The TDD movie",
            votes: 5,
            tmdbId: 2345,
          });
        });
      });
      context("with movieId 5678", () => {
        it("should return correct movie", async () => {
          expect(await movieDb.getMovie(5678)).to.deep.equal({
            id: 5678,
            name: "The BDD movie",
            votes: 4,
            tmdbId: 6789,
          });
        });
      });
    });
  });
}
