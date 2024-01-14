import request from "supertest";
import { createMovieApp } from "./movie-app";

describe("Movie Ratings App", () => {
  context("Acceptance tests", () => {
    context("vote for movie", () => {
      it("should accept my vote", async () => {
        const app = createMovieApp([]);
        await request(app).post("/movie/1234/vote").expect(200);
      });
    });
    context("retrieve movie details", () => {
      context("movie 1234 exists", () => {
        it("should retrieve details", async () => {
          const app = createMovieApp([
            {
              id: 1234,
              name: "The TDD movie",
              votes: 5,
              tmdbRating: 6.4,
            },
          ]);
          await request(app).get("/movie/1234").expect(200, {
            id: 1234,
            name: "The TDD movie",
            votes: 5,
            tmdbRating: 6.4,
          });
        });
      });
      context("movie 5678 exists", () => {
        it("should retrieve details", async () => {
          const app = createMovieApp([
            {
              id: 5678,
              name: "The BDD movie",
              votes: 4,
              tmdbRating: 5.4,
            },
          ]);
          await request(app).get("/movie/5678").expect(200, {
            id: 5678,
            name: "The BDD movie",
            votes: 4,
            tmdbRating: 5.4,
          });
        });
      });
    });
  });
  context("Technical tests", () => {
    context("vote for movie", () => {
      context("incorrect HTTP method", () => {
        it("should return 404", async () => {
          const app = createMovieApp([]);
          await request(app).get("/movie/1234/vote").expect(404);
        });
      });
    });
  });
});
