export interface CountryType {
  name: {
    common: string;
    official: string;
  };
  cca2: string;
  cca3: string;
  ccn3?: string;
  capital?: string[];
  region?: string;
  area?: number;
  population?: number;
  status?: string;
  flags?: {
    png?: string;
    svg?: string;
    alt?: string;
  };
}