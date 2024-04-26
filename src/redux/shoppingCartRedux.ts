import { createSlice } from "@reduxjs/toolkit";

import { stat } from "fs";
import { ProductInterface } from "./productRedux";

interface CartProduct {
  itemQuantity: number;
  itemTotalPrice: number;
  product: ProductInterface;
}

interface ShoppingCartState {
  totalQuantity: number;
  total: number;
  products: CartProduct[];
}

const initialState: ShoppingCartState = {
  totalQuantity: 0,
  total: 0,
  products: [],
};

const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.totalQuantity += action.payload.quantity;
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
    },
    updateCart: (state, action) => {
      state.products = action.payload.productWithPriceTotal;
      state.total = action.payload.total;
      state.totalQuantity = action.payload.totalQuantity;
    },
    setTotalQuantity(state, action) {
      state.totalQuantity = action.payload;
    },
  },
});

export const { addProduct, updateCart, setTotalQuantity } =
  shoppingCartSlice.actions;

export default shoppingCartSlice.reducer;
