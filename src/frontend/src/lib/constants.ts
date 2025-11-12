export const GAME_INFINITE_PERPAGE = 10;
export const SALT_ROUNDS = 13;

export const DEFAULT_CATEGORIES = null;
export const DEFAULT_SORTBY = null;

export const DEFAULT_AVATAR_IMG =
  "https://vault-app-bucket.s3.ap-southeast-2.amazonaws.com/default-cover/user-default.jpg";

export const CURRENTUSER_BASEQUERYKEY = ["user"];
export const WISHLIST_BASEQUERYKEY = ["user", "wishlist"];
export const CART_BASEQUERYKEY = ["user", "cart"];
export const SIGNPSTEP_BASEQUERYKEY = ["signup-step"];
export const GENRES_BASEQUERYKEY = ["genres"];
export const GAMES_BASEQUERYKEY = ["games", DEFAULT_CATEGORIES, DEFAULT_SORTBY];
export const GAMES_INFINITES_BASEQUERYKEY = [
  "games",
  "infinite",
  DEFAULT_CATEGORIES,
  DEFAULT_SORTBY,
];
