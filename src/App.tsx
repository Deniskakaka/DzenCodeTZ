import { TopMenu } from "./components/topMenu";
import { NavigationMenu } from "./components/navigationMenu";
import { Routes, Route } from "react-router-dom";

import { Orders } from "./pages/orders";
import { Products } from "./pages/products";
import { useEffect } from "react";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { ReducerState } from "./types/reducer";
import { fetchOrders, fetchProducts } from "./redux/actions";

import "./main.scss";

function App() {
  const dispatch = useDispatch<ThunkDispatch<ReducerState, void, AnyAction>>();

  useEffect(() => {
    dispatch(fetchOrders());
    dispatch(fetchProducts());
  }, []);

  return (
    <div className="app">
      <TopMenu />
      <NavigationMenu />
      <Routes>
        <Route path="/" element={<>This start page, choose category</>} />
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
