import { useState } from "react";
import { useFormik } from "formik";
import { Field } from "../field/Field";
import { useDispatch } from "react-redux";
import { addOrder } from "../../../redux/reducer";
import { switchOpenFormOrder } from "../../../redux/general/reducer";
import { validationSchema } from "../shemas/orderShema";

import "./orderForm.scss";
import { currentTime, formattedDateStart } from "../../../helpers/data";

export const OrderForm = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      title: "",
      describe: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(
        addOrder({
          id: Date.now(),
          title: formik.values.title,
          date: `${formattedDateStart} ${currentTime}`,
          description: formik.values.describe,
        })
      );
      formik.resetForm();
    },
  });

  const closeForm = () => {
    dispatch(switchOpenFormOrder());
  };

  return (
    <form
      className="orderForm "
      onSubmit={formik.errors && formik.handleSubmit}
    >
      <button className="orderForm_close" onClick={closeForm}>
        close
      </button>
      <Field
        value={formik.values.title}
        onChange={formik.handleChange}
        placeholder="title order"
        name="title"
        title="Title"
        error={formik.errors.title}
        type="text"
      />
      <Field
        value={formik.values.describe}
        onChange={formik.handleChange}
        placeholder="describe order"
        name="describe"
        title="Describe"
        error={formik.errors.describe}
        type="text"
      />
      <button type="submit" className="orderForm__button">
        ADD
      </button>
    </form>
  );
};
