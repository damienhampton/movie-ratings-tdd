import { TMDBInterface } from "./tmdb-movie";

export function TMDBContractTests(
  name: string,
  createTestTMDB: (ids: number[]) => TMDBInterface
) {
  describe(`${name}: tmdb contract tests`, () => {
    context("getMovieDetails", () => {
      context("with id 1234", () => {
        it("should return tmdb movie record", async () => {
          const tmdb = createTestTMDB([278]);
          const result = await tmdb.getMovieDetails(278);
          expect(result).to.have.property("vote_average");
          expect(typeof result?.vote_average).to.equal("number");
        });
      });
      context("with id 0", () => {
        it("should return undefined", async () => {
          const tmdb = createTestTMDB([]);
          expect(await tmdb.getMovieDetails(0)).to.be.undefined;
        });
      });
    });
  });
}
