import { ChangeEvent, lazy } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";

import { validationSchema } from "../shemas/productShame";
import { Order } from "../../../types/order";
import { addProduct } from "../../../redux/reducer";
import {
  currentTime,
  formattedDateEnd,
  formattedDateStart,
} from "../../../helpers/data";

import { RootState } from "../../../store";
import { switchOpenFormProduct } from "../../../redux/general/reducer";

import "./productForm.scss";

const Field = lazy(() => import("../field/index"));

export const ProductForm = () => {
  const orders = useSelector((state: RootState) => state.product.orders);

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      serialNumber: "",
      status: 1,
      photo: "",
      title: "",
      type: "Monitors",
      specification: "",
      start: formattedDateStart,
      end: formattedDateEnd,
      usd: "",
      uah: "",
      order: 1,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(
        addProduct({
          id: Date.now(),
          serialNumber: +values.serialNumber,
          isNew: values.status,
          photo: values.photo,
          title: values.title,
          type: values.type,
          specification: values.specification,
          guarantee: {
            start: `${values.start} ${currentTime}`,
            end: `${values.end} ${currentTime}`,
          },
          price: [
            { value: +values.usd, symbol: "USD", isDefault: 0 },
            { value: +values.uah, symbol: "UAH", isDefault: 1 },
          ],
          order: values.order,
          date: `${formattedDateStart} ${currentTime}`,
        })
      );
      dispatch(switchOpenFormProduct());
      formik.resetForm();
    },
  });

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    formik.setFieldValue("photo", JSON.stringify(file));
  };

  return (
    <form
      onSubmit={formik.errors && formik.handleSubmit}
      className="productForm"
    >
      <button
        className="productForm_close"
        onClick={() => dispatch(switchOpenFormProduct())}
      >
        close
      </button>
      <Field
        value={formik.values.title}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder="Enter Title"
        name="title"
        title="title"
        type="text"
        error={formik.errors.title}
        touched={formik.touched.title}
      />
      <Field
        value={formik.values.serialNumber}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder="Enter serial number"
        name="serialNumber"
        title="Serial number"
        type="text"
        error={formik.errors.serialNumber}
        touched={formik.touched.serialNumber}
      />
      <Field
        value={formik.values.specification}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder="Enter specification"
        name="specification"
        title="Specification"
        type="text"
        error={formik.errors.specification}
        touched={formik.touched.specification}
      />
      <Field
        value={formik.values.usd}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder="Enter cost USD"
        name="usd"
        title="USD"
        type="text"
        error={formik.errors.usd}
        touched={formik.touched.usd}
      />
      <Field
        value={formik.values.uah}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder="Enter cost UAH"
        name="uah"
        title="UAH"
        type="text"
        error={formik.errors.uah}
        touched={formik.touched.uah}
      />
      <div className="productForm_secondPart">
        <label className="productForm_secondPart__file">
          <input type="file" onChange={handleFileChange} accept="image/*" />
        </label>
        <div className="productForm_secondPart__status">
          <label>
            <span>Free</span>
            <input
              type="radio"
              name="status"
              value="1"
              checked
              onChange={formik.handleChange}
            />
          </label>
          <label>
            <span>Repeire</span>
            <input
              type="radio"
              name="status"
              value="0"
              onChange={formik.handleChange}
            />
          </label>
        </div>
        <label className="productForm_secondPart__type">
          <select
            name="type"
            onChange={formik.handleChange}
            value={formik.values.type}
          >
            <option>Monitors</option>
            <option>TV</option>
          </select>
        </label>
        <div className="productForm_secondPart__guarantee">
          <label>
            <span>Start Guarantee</span>
            <input
              type="date"
              name="start"
              value={formik.values.start}
              onChange={formik.handleChange}
            />
          </label>
          <label>
            <span>End Guarantee</span>
            <input
              type="date"
              name="end"
              value={formik.values.end}
              onChange={formik.handleChange}
            />
          </label>
        </div>
        <label className="productForm_secondPart__order">
          <select
            name="order"
            value={formik.values.order}
            onChange={formik.handleChange}
          >
            {orders.map((order: Order) => {
              return (
                <option key={order.id} value={order.id}>
                  {order.id}
                </option>
              );
            })}
          </select>
        </label>
      </div>
      <button className="productForm_button" type="submit">
        ADD
      </button>
    </form>
  );
};
