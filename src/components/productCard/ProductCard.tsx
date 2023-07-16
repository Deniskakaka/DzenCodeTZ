import classNames from "classnames";
import { Product } from "../../types/product";
import { Trash } from "../../ui/trash/Trash";
import "./productCard.scss";
import { addTrash } from "../../redux/reducer";
import { useDispatch } from "react-redux";

type Props = {
  product: Product;
  trash?: boolean;
};

export const ProductCard: React.FC<Props> = ({ product, trash }) => {
  const dispatch = useDispatch();

  const openToTrash = () => {
    dispatch(addTrash(product));
  };

  const renderDate = () => {
    const date = new Date(product.date);
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
    <div className="productCard">
      <div
        className={classNames({
          completed: product.isNew,
          disable: !product.isNew,
        })}
      ></div>
      <span>{product.type}</span>
      {renderDate()}
      <div className="productCard_icon"></div>
      <div className="productCard_info">
        <span className="productCard_info__title">{product.title}</span>
        <span className="productCard_info__number">{product.serialNumber}</span>
      </div>
      <span className="productCard_status">
        {product.isNew ? "Free" : "Repeire"}
      </span>
      {!trash && <Trash func={openToTrash} />}
    </div>
  );
};
