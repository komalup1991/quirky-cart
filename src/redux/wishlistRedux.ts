import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductInterface } from "./productRedux";

// Define the initial state type for the wishlist
interface WishlistState {
  wishlistItems: ProductInterface[];
  isFetching: boolean;
  error: boolean;
}

const initialState: WishlistState = {
  wishlistItems: [],
  isFetching: false,
  error: false,
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    // Add Product to Wishlist
    addWishlistStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addWishlistSuccess: (state, action: PayloadAction<ProductInterface>) => {
      state.isFetching = false;
      const exists = state.wishlistItems.find(
        (item) => item.id === action.payload.id,
      );
      if (!exists) {
        state.wishlistItems.push(action.payload);
      }
    },
    addWishlistFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    // Remove Product from Wishlist
    removeWishlistStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    removeWishlistSuccess: (state, action: PayloadAction<string>) => {
      state.isFetching = false;
      state.wishlistItems = state.wishlistItems.filter(
        (item) => item.id !== action.payload,
      );
    },
    removeWishlistFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  addWishlistStart,
  addWishlistSuccess,
  addWishlistFailure,
  removeWishlistStart,
  removeWishlistSuccess,
  removeWishlistFailure,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
