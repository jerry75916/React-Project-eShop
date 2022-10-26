import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  minPrice: null,
  maxPrice: null,
};

const ProductSlice = createSlice({
  name: "Product",
  initialState,
  reducers: {
    STORE_PRODUCTS: (state, action) => {
      state.products = action.payload.products;
    },
    GET_PRICE_RANGE: (state, action) => {
      const { products } = action.payload;
      const array = [];
      products.map((product) => {
        const price = product.price;
        return array.push(price);
      });
      const Max = Math.max(...array);
      const Min = Math.min(...array);
      state.minPrice = Min;
      state.maxPrice = Max;
    },
  },
});

export const { STORE_PRODUCTS, GET_PRICE_RANGE } = ProductSlice.actions;
export const selectProducts = (state) => state.Product.products;
export const selectMinPrice = (state) => state.Product.minPrice;
export const selectMaxPrice = (state) => state.Product.maxPrice;
export default ProductSlice.reducer;
