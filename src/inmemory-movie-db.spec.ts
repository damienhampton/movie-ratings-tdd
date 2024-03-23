import { movieDBContractTests } from "./movie-db-contract.spec";
import { InmemoryMovieDB } from "./inmemory-movie-db";

movieDBContractTests(
  "InmemoryMovieDB",
  (params) => new InmemoryMovieDB(params)
);
