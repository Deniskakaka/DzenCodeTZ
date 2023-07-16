import { Order } from "./order";
import { Product } from "./product";

export type ReducerState = {
  orders: Order[];
  products: Product[];
  loader: { orders: boolean; products: boolean };
  error: boolean;
  orderID: number | null;
  trash: Order | Product | null;
};

export type GeneralReducer = {
  isOpen: boolean;
  formOpen: { order: boolean; product: boolean };
};
