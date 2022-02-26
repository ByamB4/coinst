export interface GetStoriesParams {
  username: string;
}

export interface GetStoriesResponse {
  date: string;
  type: "image" | "video";
  url: "string";
}

export interface ChartParams {
  symbol: "IHC/MNT";
  // 14400 = 4 hours
  // 86400 = 1 day
  interval: 14400 | 86400;
}

export interface DealsParams {
  symbol: "IHC/MNT";
  limit: number;
}
