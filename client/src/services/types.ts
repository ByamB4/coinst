import {
  IAssets,
  IStake,
  IBalance,
  IBank,
  IBankAddress,
  IFiat,
  IUser,
} from "interfaces";
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
  symbol: "IHC/MNT" | "MNDT/MNT";
  limit: number;
}

export interface PostInitResponse {
  user: IUser;
  assets: IAssets[];
  balance: IBalance[];
  fiats: IFiat[];
  bankAddress: IBankAddress[];
  ieoID?: any;
  ieo?: any;
  banks: IBank[];
  stake: IStake;
  s: number;
  forgetPwd: {
    needVerifyID: boolean;
    verifyIDLength: number;
  };
}

export interface TickersResponse {
  [key: string]: {
    volume: number;
    high: number;
    deal: number;
    close: number;
    low: number;
    change: number;
    timestamp: number;
    market: string;
  };
}
