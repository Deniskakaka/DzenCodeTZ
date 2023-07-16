import { useState } from "react";
import { Field } from "../field/Field";
import { useDispatch } from "react-redux";
import { addOrder } from "../../../redux/reducer";
import { switchOpenFormOrder } from "../../../redux/general/reducer";

import "./orderForm.scss";

export const OrderForm = () => {
  const [title, setTitle] = useState("");
  const [describe, setDescribe] = useState("");
  const [error, setError] = useState({
    title: false,
    describe: false,
  });
  const dispatch = useDispatch();

  const onChangeField = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === "title") {
      setTitle(value);
      setError((prevError) => ({ ...prevError, title: value === "" }));
    } else if (name === "describe") {
      setDescribe(value);
      setError((prevError) => ({ ...prevError, describe: value === "" }));
    }
  };

  const handleAddOrder = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const hours = String(currentDate.getHours()).padStart(2, "0");
    const minutes = String(currentDate.getMinutes()).padStart(2, "0");
    const seconds = String(currentDate.getSeconds()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    setError({
      title: title === "",
      describe: describe === "",
    });

    if (title && describe) {
      dispatch(
        addOrder({
          id: Date.now(),
          title: title,
          date: formattedDate,
          description: describe,
        })
      );
      dispatch(switchOpenFormOrder());
    }
  };

  return (
    <form onSubmit={handleAddOrder} className="orderForm">
      <button
        className="orderForm_close"
        onClick={() => dispatch(switchOpenFormOrder())}
      >
        close
      </button>
      <Field
        value={title}
        onChange={onChangeField}
        placeholder="title order"
        name="title"
        title="Title"
        error={error.title}
        type="text"
      />
      <Field
        value={describe}
        onChange={onChangeField}
        placeholder="describe order"
        name="describe"
        title="Describe"
        error={error.describe}
        type="text"
      />
      <button type="submit" className="orderForm__button">
        ADD
      </button>
    </form>
  );
};
