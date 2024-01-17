import request from "supertest";
import { createMovieApp } from "./movie-app";
import { MovieServiceInterface } from "./movie-service";
import sinon from "sinon";
import { Movie } from "./movie-model";

describe("Movie Ratings App", () => {
  context("Acceptance tests", () => {
    context("vote for movie 1234", () => {
      it("should accept my vote", async () => {
        const service = <MovieServiceInterface>{};
        service.addVote = sinon
          .stub<[movieId: number]>()
          .withArgs(1234)
          .resolves();
        const app = createMovieApp(service);
        await request(app).post("/movie/1234/vote").expect(200);
        expect(service.addVote).to.have.been.calledOnceWith(1234);
      });
    });
    context("vote for movie 5678", () => {
      it("should accept my vote", async () => {
        const service = <MovieServiceInterface>{};
        service.addVote = sinon
          .stub<[movieId: number]>()
          .withArgs(5678)
          .resolves();
        const app = createMovieApp(service);
        await request(app).post("/movie/5678/vote").expect(200);
        expect(service.addVote).to.have.been.calledOnceWith(5678);
      });
    });
    context("retrieve movie details", () => {
      context("movie 1234 exists", () => {
        it("should retrieve details", async () => {
          const service = <MovieServiceInterface>{};
          service.getMovie = sinon
            .stub<[movieId: number], Promise<Movie>>()
            .withArgs(1234)
            .resolves({
              id: 1234,
              name: "The TDD movie",
              votes: 5,
              tmdbRating: 6.4,
            });
          const app = createMovieApp(service);
          await request(app).get("/movie/1234").expect(200, {
            id: 1234,
            name: "The TDD movie",
            votes: 5,
            tmdbRating: 6.4,
          });
          expect(service.getMovie).to.have.been.calledOnceWith(1234);
        });
      });
      context("movie 5678 exists", () => {
        it("should retrieve details", async () => {
          const service = <MovieServiceInterface>{};
          service.getMovie = sinon
            .stub<[movieId: number], Promise<Movie>>()
            .withArgs(5678)
            .resolves({
              id: 5678,
              name: "The BDD movie",
              votes: 4,
              tmdbRating: 5.4,
            });
          const app = createMovieApp(service);
          await request(app).get("/movie/5678").expect(200, {
            id: 5678,
            name: "The BDD movie",
            votes: 4,
            tmdbRating: 5.4,
          });
          expect(service.getMovie).to.have.been.calledOnceWith(5678);
        });
      });
    });
  });
  context("Technical tests", () => {
    context("vote for movie", () => {
      context("incorrect HTTP method", () => {
        it("should return 404", async () => {
          const service = <MovieServiceInterface>{};
          const app = createMovieApp(service);
          await request(app).get("/movie/1234/vote").expect(404);
        });
      });
    });
  });
});
