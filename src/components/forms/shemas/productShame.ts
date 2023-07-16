import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  title: Yup.string()
    .matches(/^[^0-9]*$/, "Title cannot contain numbers")
    .required("Field is required"),
  serialNumber: Yup.string()
    .matches(/^[0-9]+$/, "Serial number can only contain letters")
    .required("Field is required"),
  specification: Yup.string().required("Field is required"),
  usd: Yup.string()
    .matches(/^[0-9]+$/, "Serial number can only contain letters")
    .required("Field is required"),
  uah: Yup.string()
    .matches(/^[0-9]+$/, "Serial number can only contain letters")
    .required("Field is required"),
});
