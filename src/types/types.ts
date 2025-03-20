export interface Country {
  name: {
    common: string;
    official: string;
  };
  region: string;
  flags: {
    png: string;
    svg: string;
  };
  population: number;
}
