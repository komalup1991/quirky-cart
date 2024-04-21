import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the product item
export interface ProductInterface {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  stockQuantity: number;
  category: string;
  rating: number;
  size: string;
  color: string;
  
}

// Define the initial state type
interface ProductState {
  products: ProductInterface[];
  isFetching: boolean;
  error: boolean;
}

const initialState: ProductState = {
  products: [],
  isFetching: false,
  error: false,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    //GET ALL
    getProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getProductSuccess: (state, action: PayloadAction<ProductInterface[]>) => {
      state.isFetching = false;
      state.products = action.payload;
    },
    getProductFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //DELETE
    deleteProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteProductSuccess: (state, action: PayloadAction<string>) => {
      state.isFetching = false;
      const index = state.products.findIndex(product => product.id === action.payload);
      if (index !== -1) {
        state.products.splice(index, 1);
      }
    },
    deleteProductFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //UPDATE
    updateProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateProductSuccess: (state, action: PayloadAction<{id: string, product: ProductInterface}>) => {
      state.isFetching = false;
      const index = state.products.findIndex(product => product.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload.product;
      }
    },
    updateProductFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //ADD
    addProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addProductSuccess: (state, action: PayloadAction<ProductInterface>) => {
      state.isFetching = false;
      state.products.push(action.payload);
    },
    addProductFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getProductStart,
  getProductSuccess,
  getProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  deleteProductFailure,
  updateProductStart,
  updateProductSuccess,
  updateProductFailure,
  addProductStart,
  addProductSuccess,
  addProductFailure,
} = productSlice.actions;

export default productSlice.reducer;
