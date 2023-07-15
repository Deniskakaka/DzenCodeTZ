import { orders, products } from "../data/orders";
import { Order } from "../types/order";
import { Product } from "../types/product";

export const responseOrders = (): Promise<Order[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(orders);
    }, 2500);
  });
};

export const responseProducts = (): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(products);
    }, 2500);
  });
};
