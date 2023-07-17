import { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames";

import { Trash } from "../../ui/trash";

import { Order } from "../../types/order";
import { addTrash, orderID } from "../../redux/reducer";
import { Product } from "../../types/product";
import { RootState } from "../../store";
import { switchOpen } from "../../redux/general/reducer";

import "./orderCard.scss";

type Props = {
  order: Order;
  trash?: boolean;
};

export const OrderCard: React.FC<Props> = ({ order, trash }) => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.general.isOpen);
  const products = useSelector((state: RootState) => state.product.products);
  const orderId = useSelector((state: RootState) => state.product.orderID);

  const handleIsOpen = () => {
    dispatch(switchOpen());
    dispatch(orderID(+order.id));
  };

  const handleClose = () => {
    dispatch(switchOpen());
  };

  const openToTrash = () => {
    dispatch(addTrash(order));
  };

  const filteredOutProducts = useMemo(() => {
    return products.filter((product: Product) => +product.order === +order.id);
  }, [order.id, products]);

  const renderPriceUSD = useMemo(() => {
    if (filteredOutProducts.length) {
      return (
        <div className="orderCard_price__usd">
          {filteredOutProducts.reduce((acc, el) => acc + el.price[0].value, 0)}
          {" " + filteredOutProducts[0].price[0].symbol}
        </div>
      );
    } else {
      return <div className="orderCard_price__usd">0 USD</div>;
    }
  }, [filteredOutProducts]);

  const renderPriceUAH = useMemo(() => {
    if (filteredOutProducts.length) {
      return (
        <div className="orderCard_price__uah">
          {filteredOutProducts.reduce((acc, el) => acc + el.price[1].value, 0)}
          {" " + filteredOutProducts[0].price[1].symbol}
        </div>
      );
    } else {
      return <div className="orderCard_price__uah">0 UAH</div>;
    }
  }, [filteredOutProducts]);

  const renderDate = () => {
    const date = new Date(order.date);
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const month =
      date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth();
    const year = date.getFullYear();
    const monthName = new Intl.DateTimeFormat("en-US", {
      month: "short",
    }).format(date);
    const formattedDate = `${day} / ${month}`;
    const fullFromat = `${day}/${monthName}/${year}`;

    return (
      <div>
        <div>{formattedDate}</div>
        <div>{fullFromat}</div>
      </div>
    );
  };

  return (
    <div
      className={classNames("orderCard", {
        open: isOpen,
      })}
    >
      {!isOpen && <span className="orderCard_title">{order.title}</span>}
      <div className="orderCard_products">
        {!trash && <button onClick={handleIsOpen} disabled={isOpen}></button>}
        <span>{filteredOutProducts.length} Products</span>
      </div>
      <span className="orderCard_data">{renderDate()}</span>
      <div className="orderCard_price">
        {renderPriceUSD}
        {renderPriceUAH}
      </div>
      {!isOpen && !trash && <Trash func={openToTrash} />}
      {isOpen && orderId === +order.id && (
        <button className="orderCard_close" onClick={handleClose}></button>
      )}
    </div>
  );
};
