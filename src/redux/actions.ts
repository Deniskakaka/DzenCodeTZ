import {
  PayloadAction,
  createAction,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { responseOrders, responseProducts } from "../api/response";
import { Product } from "../types/product";
import { AppDispatch } from "../store";
import { Order } from "../types/order";
import { ReducerState } from "../types/reducer";

export const fetchOrders = createAsyncThunk<
  Order[],
  void,
  { dispatch: AppDispatch }
>("products/fetchOrders", async () => {
  const response: Order[] = await responseOrders();
  return response;
});

export const fetchProducts = createAsyncThunk<
  Product[],
  void,
  { dispatch: AppDispatch }
>("products?fetchProducts", async () => {
  const response: Product[] = await responseProducts();
  return response;
});
