import { Order } from "./order";
import { Product } from "./product";

export type ReducerState = {
  orders: Order[];
  products: Product[];
  isOpen: boolean;
  loader: { orders: boolean; products: boolean };
  error: boolean;
  orderID: number | null;
  trash: Order | Product | null;
};
