export type BaseMovie = {
  id: number;
  name: string;
  votes: number;
};

export type MovieDBRecord = BaseMovie & {
  tmdbId: number;
};

export type Movie = BaseMovie & {
  tmdbRating?: number;
};
