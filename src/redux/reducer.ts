import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReducerState } from "../types/reducer";

import { Order } from "../types/order";
import { fetchOrders, fetchProducts } from "./actions";
import { Product } from "../types/product";
import { orders, products } from "../data/orders";

const initialState: ReducerState = {
  orders: [],
  products: [],
  isOpen: false,
  loader: { orders: false, products: false },
  error: false,
  orderID: null,
  trash: null,
};

const reducerProducts = createSlice({
  name: "products",
  initialState,
  reducers: {
    switchOpen: (state: ReducerState) => {
      return {
        ...state,
        isOpen: !state.isOpen,
      };
    },
    clearOrders: (state: ReducerState) => {
      return {
        ...state,
        orders: [],
      };
    },
    orderID: (state: ReducerState, action: PayloadAction<number>) => {
      return {
        ...state,
        orderID: action.payload,
      };
    },
    addTrash: (state: ReducerState, action: PayloadAction<Order | Product>) => {
      return {
        ...state,
        trash: action.payload,
      };
    },
    clearTrash: (state: ReducerState) => {
      return {
        ...state,
        trash: null,
      };
    },
    deleteOrder: (state: ReducerState, action: PayloadAction<number>) => {
      return {
        ...state,
        orders: state.orders.filter(
          (order: Order) => order.id !== action.payload
        ),
      };
    },
    deleteProduct: (state: ReducerState, action: PayloadAction<number>) => {
      return {
        ...state,
        products: state.products.filter(
          (product: Product) => product.id !== action.payload
        ),
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOrders.pending, (state) => {
      state.loader.orders = true;
    });
    builder.addCase(
      fetchOrders.fulfilled,
      (state, action: PayloadAction<Order[]>) => {
        state.orders = action.payload;
        state.loader.orders = false;
      }
    );
    builder.addCase(fetchOrders.rejected, (state) => {
      state.error = true;
      state.loader.orders = false;
    });
    builder.addCase(fetchProducts.pending, (state) => {
      state.loader.products = true;
    });
    builder.addCase(
      fetchProducts.fulfilled,
      (state, action: PayloadAction<Product[]>) => {
        state.loader.products = false;
        state.products = action.payload;
      }
    );
    builder.addCase(fetchProducts.rejected, (state) => {
      state.loader.products = false;
      state.error = true;
    });
  },
});

export const {
  switchOpen,
  clearOrders,
  orderID,
  addTrash,
  clearTrash,
  deleteProduct,
  deleteOrder,
} = reducerProducts.actions;
export default reducerProducts.reducer;
