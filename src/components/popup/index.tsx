import { useMemo } from "react";
import { useDispatch } from "react-redux";

import { clearTrash, deleteOrder, deleteProduct } from "../../redux/reducer";
import { Order } from "../../types/order";
import { Product } from "../../types/product";
import { ProductCard } from "../productCard";
import { OrderCard } from "../orderCard";

import "./popup.scss";

type Props = {
  element: Product | Order | null;
};

export const Popup: React.FC<Props> = ({ element }) => {
  const dispatch = useDispatch();

  const renderElement = useMemo(() => {
    if (element) {
      if ("type" in element) {
        const product = element as Product;
        return <ProductCard product={product} trash={true} />;
      } else {
        const order = element as Order;
        return <OrderCard order={order} trash={true} />;
      }
    }
  }, [element]);

  const handlerClearTRash = () => {
    dispatch(clearTrash());
  };

  const handlerDelete = () => {
    if (element) {
      if ("type" in element) {
        const product = element as Product;
        dispatch(deleteProduct(product.id));
        handlerClearTRash();
      } else {
        const order = element as Order;
        dispatch(deleteOrder(order.id));
        handlerClearTRash();
      }
    }
  };

  return (
    <div className="popup">
      <h2 className="popup_title">Do you want delete?</h2>
      {renderElement}
      <div className="popup_action">
        <button className="popup_action__cancel" onClick={handlerClearTRash}>
          Cancel
        </button>
        <button className="popup_action__delete" onClick={handlerDelete}>
          delete
        </button>
      </div>
    </div>
  );
};
