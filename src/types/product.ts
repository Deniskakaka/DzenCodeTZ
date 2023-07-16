type Guarantee = {
  start: string;
  end: string;
};

type Price = {
  value: number;
  symbol: string;
  isDefault: number;
};

export type Product = {
  id: number;
  serialNumber: number;
  isNew: number;
  photo: File | null | string;
  title: string;
  type: string;
  specification: string;
  guarantee: Guarantee;
  price: Price[];
  order: number;
  date: string;
};
