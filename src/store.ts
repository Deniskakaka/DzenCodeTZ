import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import reducerProduct from "./redux/reducer";
import reducerGeneral from "./redux/general/reducer";

const rootReducer = combineReducers({
  product: reducerProduct,
  general: reducerGeneral,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
