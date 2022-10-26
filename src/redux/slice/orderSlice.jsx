import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { doc, getDoc } from "firebase/firestore";
import { fetchById } from "../../Component/Thunk/API";
import { sotreDb } from "../../pages/firebase/config";
const initialState = {
  orderHistory: [],
  TotalOrderAmount: 0,
  singleOrder: null,
};

export const fetchOrderById = createAsyncThunk(
  "orders/fetchOrderById",
  async (Table, thunkAPI) => {
    const document = await fetchById(Table.TableName, Table.id);
    return document;
  }
);

const orderSlice = createSlice({
  name: "orders",
  status: "idle",
  initialState,
  reducers: {
    STORE_ORDERS: (state, action) => {
      state.orderHistory = action.payload;
    },
    CALC_TOTAL_ORDER_AMOUNT: (state, action) => {
      const sum = state.orderHistory.reduce(function (acc, obj) {
        return acc + obj.orderAmount;
      }, 0);
      state.TotalOrderAmount = sum;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOrderById.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.singleOrder = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

export const { STORE_ORDERS, CALC_TOTAL_ORDER_AMOUNT } = orderSlice.actions;
export const selectOrderHistory = (state) => state.orders.orderHistory;
export const selectTotalOrderAmount = (state) => state.orders.TotalOrderAmount;
export const selectSingleOrder = (state) => state.orders.singleOrder;
export default orderSlice.reducer;
