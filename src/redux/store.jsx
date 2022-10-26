import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import ProductReducer from "./slice/productSlice";
import FilterReducer from "./slice/filterSlice";
import CartReducer from "./slice/cartSlice";
import CheckOutReducer from "./slice/checkoutSlice";
import OrderReducer from "./slice/orderSlice";
const rootReducer = combineReducers({
  auth: authReducer,
  Product: ProductReducer,
  filter: FilterReducer,
  cart: CartReducer,
  checkout: CheckOutReducer,
  orders: OrderReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, //避免值出來是物件不是string
    }),
});

export default store;
