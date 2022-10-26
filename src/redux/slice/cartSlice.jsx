import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
  previousURL: "",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    ADD_TO_CART: (state, action) => {
      const productIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (productIndex >= 0) {
        //item is in the cart

        state.cartItems[productIndex].Quantity += 1;

        toast.info(`${action.payload.name} increased by one`, {
          position: "top-left",
        });
      } else {
        //item is not in the cart add to cart
        const tempProduct = {
          ...action.payload,
          Quantity: 1, //此處塞了一個新的property
        };

        state.cartItems.push(tempProduct);
        toast.success(`${action.payload.name} add to cart`, {
          position: "top-left",
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    DECRESE_CART: (state, action) => {
      const productIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (productIndex >= 0) {
        //item is in the cart
        state.cartItems[productIndex].Quantity -= 1;
        if (state.cartItems[productIndex].Quantity === 0) {
          state.cartItems.splice(productIndex, 1);
          toast.success(`${action.payload.name} has removed from cart`, {
            position: "top-left",
          });
        } else {
          toast.info(`${action.payload.name} decreased by one`, {
            position: "top-left",
          });
        }
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    REMOVEFROME_CART: (state, action) => {
      const productIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      state.cartItems.splice(productIndex, 1);
      toast.success(`${action.payload.name} has removed from cart`, {
        position: "top-left",
      });

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    CLEAR_CART: (state, action) => {
      state.cartItems = [];
      state.cartTotalAmount = 0;
       state.cartTotalQuantity = 0;
      toast.info(`CartItems has all removed from cart!!`, {
        position: "top-left",
      });
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      
    },
    CALCULATE_SUBTOTAL: (state, action) => {
      let totalAmount = 0;

      state.cartItems.map((item) => {
        const { price, Quantity } = item;
        totalAmount += price * Quantity;
      });
      state.cartTotalAmount = totalAmount;
    },
    CALCULATE_TOTALQUANTITY: (state, action) => {
      let totalQuantity = 0;
      state.cartItems.map((item) => {
        const { Quantity } = item;

        totalQuantity += Quantity;
      });
      state.cartTotalQuantity = totalQuantity;
    },
    SAVE_URL: (state, action) => {
      state.previousURL = action.payload;
    },
  },
});

export const {
  ADD_TO_CART,
  DECRESE_CART,
  REMOVEFROME_CART,
  CLEAR_CART,
  CALCULATE_SUBTOTAL,
  CALCULATE_TOTALQUANTITY,
  SAVE_URL,
} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.cartItems;
export const selectCartTotalQuantity = (state) => state.cart.cartTotalQuantity;
export const selectCartTotalAmount = (state) => state.cart.cartTotalAmount;
export const selectPreviousURL=(state) => state.cart.previousURL;
export default cartSlice.reducer;
