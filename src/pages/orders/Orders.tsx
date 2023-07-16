import { OrderCard } from "../../components/orderCard/OrderCard";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";

import { useMemo } from "react";
import { Loader } from "../../ui/loader/Loader";
import { Order } from "../../types/order";
import { Product } from "../../types/product";
import { ProductCard } from "../../components/productCard/ProductCard";
import { Popup } from "../../components/popup/Popup";

import "./orders.scss";
import { CardAnimation } from "../../ui/cardAnimation/CardAnimation";
import { OrderForm } from "../../components/forms/order/OrderForm";
import {
  switchOpenFormOrder,
  switchOpenFormProduct,
} from "../../redux/general/reducer";
import { RootState } from "../../store";
import { ProductForm } from "../../components/forms/product/ProductForm";

export const Orders = () => {
  const isOpen = useSelector((state: RootState) => state.general.isOpen);
  const orders = useSelector((state: RootState) => state.product.orders);
  const products = useSelector((state: RootState) => state.product.products);
  const orderId = useSelector((state: RootState) => state.product.orderID);
  const loader = useSelector((state: RootState) => state.product.loader);
  const trash = useSelector((state: RootState) => state.product.trash);
  const openFormOrder = useSelector(
    (state: RootState) => state.general.formOpen.order
  );
  const openFormProduct = useSelector(
    (state: RootState) => state.general.formOpen.product
  );
  const dispatch = useDispatch();

  const switchShowFormOrder = () => {
    dispatch(switchOpenFormOrder());
  };

  const switchShowFormProduct = () => {
    dispatch(switchOpenFormProduct());
  };

  const renderOrders = useMemo(() => {
    if (!orders.length && loader.orders) {
      return <Loader />;
    } else {
      return orders.map((order: Order) => (
        <OrderCard order={order} key={order.id} />
      ));
    }
  }, [orders, loader]);

  const renderProducts = useMemo(() => {
    if (loader.products) {
      return <Loader />;
    } else {
      return (
        <div className="orders_products">
          <button
            className="orders_count__plus"
            onClick={switchShowFormProduct}
          >
            +
          </button>
          {products
            .filter((product: Product) => +product.order === orderId)
            .map((product: Product, index: number) => (
              <CardAnimation index={index} key={product.id}>
                <ProductCard product={product} key={product.id} />
              </CardAnimation>
            ))}
        </div>
      );
    }
  }, [loader.products, orderId, products]);

  return (
    <div className="orders">
      <div className="orders_count">
        <button className="orders_count__plus" onClick={switchShowFormOrder}>
          +
        </button>
        Orders / {orders.length}
      </div>
      <div className="orders_wrapper">
        <div
          className={classNames("orders_items", {
            close: isOpen,
          })}
        >
          {renderOrders}
        </div>
        {isOpen && renderProducts}
      </div>
      {trash && (
        <div className="modal_wrapper">
          <Popup element={trash} />
        </div>
      )}
      {openFormOrder || openFormProduct ? (
        <div className="modal_wrapper">
          {openFormOrder && <OrderForm />}
          {openFormProduct && <ProductForm />}
        </div>
      ) : null}
    </div>
  );
};
