import { useDispatch, useSelector } from "react-redux";

import { CardAnimation } from "../../ui/cardAnimation/CardAnimation";
import { Loader } from "../../ui/loader/Loader";
import { Popup } from "../../components/popup/Popup";
import { ReducerState } from "../../types/reducer";
import { Product } from "../../types/product";
import { ProductCard } from "../../components/productCard/ProductCard";
import { useEffect, useMemo, useState } from "react";
import { fetchProducts } from "../../redux/actions";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";

import "./products.scss";

export const Products = () => {
  const [filter, setFilter] = useState("Monitors");
  const products = useSelector((state: ReducerState) => state.products);
  const loader = useSelector((state: ReducerState) => state.loader.products);
  const trash = useSelector((state: ReducerState) => state.trash);
  const dispatch = useDispatch<ThunkDispatch<ReducerState, void, AnyAction>>();

  useEffect(() => {
    if (!products.length) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  const renderProducts = useMemo(() => {
    if (loader) {
      return <Loader />;
    } else {
      return (
        <div className="products_items">
          {products
            .filter((product: Product) => product.type === filter)
            .map((product: Product) => (
              <CardAnimation index={0} key={product.id}>
                <ProductCard product={product} />
              </CardAnimation>
            ))}
        </div>
      );
    }
  }, [loader, products, filter]);

  const onChangeFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value);
  };

  return (
    <div className="products">
      <div className="products_filter">
        <h2>Product / {products.length}</h2>
        <label className="products_filter__selector">
          <span>Type</span>
          <select value={filter} onChange={onChangeFilter}>
            <option>Monitors</option>
            <option>TV</option>
          </select>
        </label>
      </div>
      {renderProducts}
      {trash && (
        <div className="popup_wrapper">
          <Popup element={trash} />
        </div>
      )}
    </div>
  );
};
