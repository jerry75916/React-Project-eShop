import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filterProducts: [],
};

const FilterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTER_BY_SEARCH: (state, action) => {
      const { products, search } = action.payload;
      state.filterProducts = products.filter((product) => {
        return product.name.toLowerCase().includes(search.toLowerCase());
      });
    },
    SORT_PRODUCT: (state, action) => {
      const { products, sort } = action.payload;
      let TempProducts = products;
      if (sort === "latest") {
        TempProducts = products;
      }
      if (sort === "lowest-price") {
        //slice 淺拷貝，回傳一個新物件，因為strict mode
        TempProducts = products.slice().sort((a, b) => {
          return a.price - b.price;
        });
      }
      if (sort === "highest-price") {
        //slice 淺拷貝，回傳一個新物件，因為strict mode
        TempProducts = products.slice().sort((a, b) => {
          return b.price - a.price;
        });
      }
      if (sort === "a-z") {
        //slice 淺拷貝，回傳一個新物件，因為strict mode
        TempProducts = products.slice().sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
      }
      if (sort === "z-a") {
        //slice 淺拷貝，回傳一個新物件，因為strict mode
        TempProducts = products.slice().sort((a, b) => {
          return b.name.localeCompare(a.name);
        });
      }
      state.filterProducts = TempProducts;
    },
    CHANGE_CATEGORY: (state, action) => {
      const { products, Category } = action.payload;
      if (Category !== "All") {
        state.filterProducts = products.filter((product) => {
          return product.category === Category;
        });
      } else {
        state.filterProducts = products;
      }
    },
    CHANGE_BRAND: (state, action) => {
      const { products, Brand } = action.payload;
      if (Brand !== "All") {
        state.filterProducts = products.filter((product) => {
          return product.brand === Brand;
        });
      } else {
        state.filterProducts = products;
      }
    },
    CHANGE_PRICE: (state, action) => {
      const { products, price } = action.payload;

      state.filterProducts = products.filter((product) => {
        return product.price <= price;
      });
    },
  },
});

export const {
  FILTER_BY_SEARCH,
  SORT_PRODUCT,
  CHANGE_CATEGORY,
  CHANGE_BRAND,
  CHANGE_PRICE,
} = FilterSlice.actions;
export const selectFilterProductis = (state) => state.filter.filterProducts;
export default FilterSlice.reducer;
