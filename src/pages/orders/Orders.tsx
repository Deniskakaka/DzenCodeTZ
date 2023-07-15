import { OrderCard } from "../../components/orderCard/OrderCard";
import { useSelector } from "react-redux";
import classNames from "classnames";

import { ReducerState } from "../../types/reducer";
import { useMemo } from "react";
import { Loader } from "../../ui/loader/Loader";
import { Order } from "../../types/order";
import { Product } from "../../types/product";
import { ProductCard } from "../../components/productCard/ProductCard";
import { Popup } from "../../components/popup/Popup";

import "./orders.scss";
import { CardAnimation } from "../../ui/cardAnimation/CardAnimation";

export const Orders = () => {
  const isOpen = useSelector((state: ReducerState) => state.isOpen);
  const orders = useSelector((state: ReducerState) => state.orders);
  const products = useSelector((state: ReducerState) => state.products);
  const orderId = useSelector((state: ReducerState) => state.orderID);
  const loader = useSelector((state: ReducerState) => state.loader);
  const trash = useSelector((state: ReducerState) => state.trash);

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
      <h2 className="orders_count">Orders / {orders.length}</h2>
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
        <div className="popup_wrapper">
          <Popup element={trash} />
        </div>
      )}
    </div>
  );
};
