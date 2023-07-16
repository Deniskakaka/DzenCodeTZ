import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";

import { Loader } from "../../ui/loader/Loader";
import { Order } from "../../types/order";
import { Product } from "../../types/product";
import { ProductCard } from "../../components/productCard";
import { Popup } from "../../components/popup";
import { CardAnimation } from "../../ui/cardAnimation/CardAnimation";
import { OrderForm } from "../../components/forms/order";
import { OrderCard } from "../../components/orderCard";
import {
  switchOpenFormOrder,
  switchOpenFormProduct,
} from "../../redux/general/reducer";
import { RootState } from "../../store";
import { ProductForm } from "../../components/forms/product";

import "./orders.scss";

export const Orders = () => {
  const { orders, products, orderID, loader, trash } = useSelector(
    (state: RootState) => state.product
  );
  const { isOpen, formOpen } = useSelector((state: RootState) => state.general);

  const dispatch = useDispatch();

  const switchShowFormOrder = () => {
    dispatch(switchOpenFormOrder());
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
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
    console.log(products);
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
            .filter((product: Product) => +product.order === orderID)
            .map((product: Product, index: number) => (
              <CardAnimation index={index} key={product.id}>
                <ProductCard product={product} key={product.id} />
              </CardAnimation>
            ))}
        </div>
      );
    }
  }, [loader.products, orderID, products, switchShowFormProduct]);

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
      {formOpen.order || formOpen.product ? (
        <div className="modal_wrapper">
          {formOpen.order && <OrderForm />}
          {formOpen.product && <ProductForm />}
        </div>
      ) : null}
    </div>
  );
};
