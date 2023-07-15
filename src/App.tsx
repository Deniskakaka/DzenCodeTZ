import { Header } from "./components/header/Header";
import { SaidBar } from "./components/saidBar/SaidBar";
import { Routes, Route } from "react-router-dom";
import "./main.scss";
import { Orders } from "./pages/orders/Orders";
import { Products } from "./pages/products/Products";
import { useEffect } from "react";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { ReducerState } from "./types/reducer";
import { fetchOrders, fetchProducts } from "./redux/actions";

function App() {
  const dispatch = useDispatch<ThunkDispatch<ReducerState, void, AnyAction>>();

  useEffect(() => {
    dispatch(fetchOrders());
    dispatch(fetchProducts());
  }, []);

  return (
    <div className="app">
      <Header />
      <SaidBar />
      <Routes>
        <Route path="/orders" element={<Orders />} />
        <Route path="/products" element={<Products />} />
        <Route
          path="*"
          element={<h1 className="notFound">Page not found</h1>}
        />
      </Routes>
    </div>
  );
}

export default App;
