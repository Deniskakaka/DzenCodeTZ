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
  return (
    <div className="productCard">
      <div
        className={classNames({
          completed: product.isNew,
          disable: !product.isNew,
        })}
      ></div>
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
