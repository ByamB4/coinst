type SYMBOLS = "CHB" | "IHC" | "MNT" | "BTC";

export interface IBalance {
  symbol: SYMBOLS;
  market: string;
  available: number;
  freeze: number;
}

export interface IUser {
  id: number;
  userid: string;
  username: string;
  usernameMask: string;
  channel: string;
  security: IUserSecurity;
  kyc: IUserKyc;
  lastChangePassword: number;
}

export interface IUserSecurity {
  userid: string;
  phone: string;
  email: string;
  emailEnable: boolean;
  phoneEnable: boolean;
  gaEnable: boolean;
  securityExpired: number;
  ga: string;
}

export interface IUserKyc {
  firstName: string;
  lastName: string;
  imageUrl1: string;
  idNumber: string;
  kycMsg: string;
  status: number;
  stage1: null;
  stage2: null;
  stage3: null;
  stage4: null;
  kycImage: null;
}

export interface IAssets {
  id: number;
  symbol: SYMBOLS;
  icon: string;
  fullname: string;
  chaintype: number;
  show_precision: number;
  save_precision: number;
  chain_contract_address: null;
  minDeposit: number;
  minWithdraw: number;
  canDeposit: boolean;
  canWithdraw: boolean;
  withdrawFee: number;
  hasTag: boolean;
  supportWithdraw: null;
  supportWithdrawFee: null;
  supportMinWithdraw: null;
  supportMinDeposits: null;
  fiat: boolean;
}

export interface IFiat {
  stock: SYMBOLS;
  money: "USD";
  price: number;
}

export interface IBankAddress {
  id: number;
  userid: string;
  bank_account: string;
  bank_number: string;
  beneficiary_address?: any;
  beneficiary_zip?: any;
  beneficiary_country?: any;
  bank_code: string;
  bank_name?: any;
  bank_branch_name?: any;
  bank_country?: any;
  bank_province?: any;
  bank_address?: any;
  swfit?: any;
  aba?: any;
  createAt: number;
}

export interface IBank {
  name: {
    mn: string;
    en: string;
  };
  code: string;
  canWithdraw: boolean;
  canDeposit: boolean;
  canShow: boolean;
  canAdd: boolean;
}

export interface IStake {
  totalStaked: number;
  totalInterest: number;
  orders: [];
  infos: {
    id: number;
    stakeAsset: string;
    duration: number;
    estimateApy: number;
    createat: number;
    endat: number;
    joinedPeople: number;
    currentPeople?: any;
    totalStakeAmount: number;
    status: number;
  }[];
  assets: {
    stakeAsset: string;
    minStakeAmount: number;
    maxStakeAmount: number;
  }[];
}
