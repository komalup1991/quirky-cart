import { createSlice } from '@reduxjs/toolkit';
import {ProductInterface} from '../components/ProductList';

interface ShoppingCartState {
  quantity: number;
  total: number;
  products: ProductInterface[];
}

const initialState: ShoppingCartState = {
  quantity: 0,
  total: 0,
  products: [],
};

const shoppingCartSlice = createSlice({
  name: 'shoppingCart',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
    },
  },
});

export const { addProduct } = shoppingCartSlice.actions;

export default shoppingCartSlice.reducer;
