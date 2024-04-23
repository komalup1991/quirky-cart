import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductInterface } from "./productRedux";
import Wishlist from "../user/Wishlist";
import { User } from "./userRedux";

// Define the initial state type for the wishlist
export interface WishlistInterface {
  productId: number;
  userId: number;
  id: number;
}
interface WishlistState {
  wishlistItems: WishlistInterface[];
  isFetching: boolean;
  error: boolean;
  isInWishlist: boolean;
}

const initialState: WishlistState = {
  wishlistItems: [],
  isFetching: false,
  error: false,
  isInWishlist: false,
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
    addWishlistSuccess: (state, action: PayloadAction<WishlistInterface>) => {
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
    removeWishlistSuccess: (
      state,
      action: PayloadAction<WishlistInterface>,
    ) => {
      state.isFetching = false;
      state.wishlistItems = state.wishlistItems.filter(function (item) {
        // Return true for all items except the one to be removed
        if (item.id.toString() !== action.payload.id.toString()) {
          return true; // Keep this item in the new array
        } else {
          return false; // Do not include this item in the new array
        }
      });
    },
    removeWishlistFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    checkWishlistStatus: (state, action: PayloadAction<number>) => {
      state.isInWishlist = state.wishlistItems.some(
        (item) => item.id === action.payload,
      );
    },
    getUWishlistStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getWishlistSuccess: (state, action: PayloadAction<WishlistInterface[]>) => {
      state.isFetching = false;
      state.wishlistItems = action.payload;
    },
    getWishlistFailure: (state) => {
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
  checkWishlistStatus,
  getUWishlistStart,
  getWishlistSuccess,
  getWishlistFailure,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
