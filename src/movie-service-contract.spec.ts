import { MovieServiceInterface } from "./movie-service";

export type CreateTestMovieServiceParams = {
  id: number;
  name?: string;
  votes?: number;
  tmdbRating?: number;
};

export function movieServiceContractTests(
  name: string,
  createTestMovieService: (
    params: CreateTestMovieServiceParams
  ) => MovieServiceInterface
) {
  describe(`${name}: movie service contract tests`, () => {
    context("add vote", () => {
      context("movie 1234", () => {
        it("should accept vote", async () => {
          const service = createTestMovieService({ id: 1234 });
          expect(await service.addVote(1234)).to.be.undefined;
        });
      });
    });
    context("getMovie", () => {
      context("movie 1234", () => {
        it("should get details", async () => {
          const service = createTestMovieService({
            id: 1234,
            name: "The TDD movie",
            votes: 5,
            tmdbRating: 6.4,
          });
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
          const service = createTestMovieService({
            id: 5678,
            name: "The BDD movie",
            votes: 4,
            tmdbRating: 5.4,
          });
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
