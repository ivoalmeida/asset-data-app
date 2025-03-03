export type Asset = {
  id: number;
  address: string;
  latitude: number;
  longitude: number;
  company?: Company;
  companyId: string;
};

export type Company = {
  id: string;
  assets?: Asset[];
}
