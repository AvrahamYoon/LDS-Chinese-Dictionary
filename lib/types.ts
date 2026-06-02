export type BranchType = "ward" | "branch";

export type BranchLanguage =
  | "mandarin"
  | "cantonese"
  | "asian"
  | "mixed";

export type BranchStatus = "active" | "discontinued" | "unknown";

export type TempleStatus = "operating" | "under-construction" | "announced";

export type BranchRegion =
  | "utah"
  | "arizona"
  | "california"
  | "texas"
  | "new-york"
  | "massachusetts"
  | "maryland"
  | "virginia"
  | "florida"
  | "washington"
  | "nevada"
  | "united-kingdom"
  | "canada"
  | "australia"
  | "new-zealand"
  | "malaysia"
  | "macau"
  | "hong-kong"
  | "china"
  | "taiwan";

export type Branch = {
  id: string;
  name: {
    en: string;
    zhTw?: string;
    zhCn?: string;
  };
  type: BranchType;
  language: BranchLanguage;
  status: BranchStatus;
  location: {
    lat: number;
    lng: number;
    address: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  region: BranchRegion;
  founded?: string;
  discontinued?: string;
  notes?: string;
  officialUrl?: string;
  sources?: string[];
  lastVerified?: string;
};

export type Temple = {
  id: string;
  name: {
    en: string;
    zhTw: string;
  };
  status: TempleStatus;
  location: {
    lat: number;
    lng: number;
    address?: string;
    city: string;
    state: string;
    country: string;
  };
  region: BranchRegion;
  announced?: string;
  groundbreaking?: string;
  dedicated?: string;
  rededicated?: string;
  notes?: string;
  officialUrl: string;
};

export type BranchFilters = {
  search: string;
  status: "all" | BranchStatus;
  type: "all" | BranchType;
  language: "all" | BranchLanguage;
  region: "all" | BranchRegion;
};

export type Locale = "en" | "zh";
