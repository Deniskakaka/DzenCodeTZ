import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { CardAnimation } from "../../ui/cardAnimation/CardAnimation";
import { Loader } from "../../ui/loader/Loader";
import { Popup } from "../../components/popup";
import { Product } from "../../types/product";
import { ProductCard } from "../../components/productCard";
import { fetchProducts } from "../../redux/actions";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";

import "./products.scss";
import { ProductForm } from "../../components/forms/product";
import { RootState } from "../../store";
import { switchOpenFormProduct } from "../../redux/general/reducer";

export const Products = () => {
  const [filter, setFilter] = useState("Monitors");
  const products = useSelector((state: RootState) => state.product.products);
  const trash = useSelector((state: RootState) => state.product.trash);
  const loader = useSelector(
    (state: RootState) => state.product.loader.products
  );
  const openForm = useSelector(
    (state: RootState) => state.general.formOpen.product
  );
  const dispatch = useDispatch<ThunkDispatch<RootState, void, AnyAction>>();

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

  const switchShowForm = () => {
    dispatch(switchOpenFormProduct());
  };

  return (
    <div className="products">
      <div className="products_filter">
        <div className="products_filter__wrapper">
          <button className="products_count__plus" onClick={switchShowForm}>
            +
          </button>
          <h2 className="products_count">Product / {products.length}</h2>
        </div>
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
        <div className="modal_wrapper">
          <Popup element={trash} />
        </div>
      )}
      {openForm && (
        <div className="modal_wrapper">
          <ProductForm />
        </div>
      )}
    </div>
  );
};
