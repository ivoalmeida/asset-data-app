export type Asset = {
  address: string;
  latitude: number;
  longitude: number;
  company: Company;
};

export type Company = {
  id: number;
  assets: Asset[];
}
