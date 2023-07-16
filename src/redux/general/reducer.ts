import { createSlice } from "@reduxjs/toolkit";
import { GeneralReducer } from "../../types/reducer";

const initialState: GeneralReducer = {
  isOpen: false,
  formOpen: { order: false, product: false },
};

const reducerGeneral = createSlice({
  name: "general",
  initialState,
  reducers: {
    switchOpen: (state: GeneralReducer) => {
      return {
        ...state,
        isOpen: !state.isOpen,
      };
    },
    switchOpenFormOrder: (state: GeneralReducer) => {
      return {
        ...state,
        formOpen: {
          order: !state.formOpen.order,
          product: state.formOpen.product,
        },
      };
    },
    switchOpenFormProduct: (state: GeneralReducer) => {
      return {
        ...state,
        formOpen: {
          order: state.formOpen.order,
          product: !state.formOpen.product,
        },
      };
    },
  },
});

export const { switchOpen, switchOpenFormOrder, switchOpenFormProduct } =
  reducerGeneral.actions;
export default reducerGeneral.reducer;
