import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  title: Yup.string()
    .matches(/^[^0-9]*$/, "Title cannot contain numbers")
    .required("Field is required"),
  describe: Yup.string()
    .matches(/^[^0-9]*$/, "Title cannot contain numbers")
    .required("Field is required"),
});
