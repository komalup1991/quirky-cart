import {
  User,
  addUserFailure,
  addUserStart,
  addUserSuccess,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  getUserFailure,
  getUserStart,
  getUserSuccess,
  loginFailure,
  loginStart,
  loginSuccess,
  logoutSuccess,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
  updateOtherUserSuccess,
} from "../redux/userRedux";
import { publicRequest, loggedInUserRequest } from "./AllApi";
import { Dispatch } from "redux";
import { Navigate } from "react-router-dom";
import { persistor } from "../redux/store";
import {
  getProductFailure,
  getProductStart,
  getProductSuccess,
  deleteProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  updateProductFailure,
  updateProductStart,
  updateProductSuccess,
  addProductFailure,
  addProductStart,
  addProductSuccess,
  ProductInterface,
} from "../redux/productRedux";
import {
  addWishlistFailure,
  addWishlistStart,
  addWishlistSuccess,
  getUWishlistStart,
  getWishlistFailure,
  getWishlistSuccess,
  removeWishlistFailure,
  removeWishlistStart,
  removeWishlistSuccess,
} from "../redux/wishlistRedux";

interface UserCredentials {
  username: string;
  password: string;
}
interface Product {
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

export const login = async (dispatch: Dispatch<any>, user: UserCredentials) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);

    if (res.status === 200) {
      dispatch(loginSuccess(res.data));
      return res.data; // Return the user data upon successful login
    } else {
      // Handle other HTTP status codes as needed
      dispatch(loginFailure());
      return null; // Return null to indicate unsuccessful login
    }
  } catch (error) {
    dispatch(loginFailure());
    return null; // Return null to handle exceptions
  }
};

export const register = async (
  dispatch: Dispatch,
  user: UserCredentials,
  navigate: (path: string) => void,
) => {
  dispatch(addUserStart());
  try {
    const res = await publicRequest.post("/auth/register", user);
    if (res.status === 200 || res.status === 201) {
      dispatch(addUserSuccess(res.data));
      navigate("/login");
    } else {
      dispatch(addUserFailure());
    }
  } catch (err) {
    console.error("Registration error:", err); // More detailed error logging
    dispatch(addUserFailure());
  }
};

export const logout = async (dispatch: Dispatch) => {
  console.log("Clearing local storage");
  localStorage.clear();
  console.log("Local storage cleared");

  dispatch(logoutSuccess());
  persistor
    .purge()
    .then(() => {
      console.log("Purged persistor storage");
      //  navigate("/");
    })
    .catch((error) => {
      console.error("Failed to purge persistor:", error);
    });
};

export const getProducts = async (dispatch: Dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await publicRequest.get("/products");
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(getProductFailure());
  }
};

export const deleteProduct = async (id: string, dispatch: Dispatch) => {
  dispatch(deleteProductStart());
  try {
    const res = await loggedInUserRequest.delete(`/products/${id}`);
    dispatch(deleteProductSuccess(id));
  } catch (err) {
    dispatch(deleteProductFailure());
  }
};

export const updateProduct = async (
  id: string,
  product: Product,
  dispatch: Dispatch,
) => {
  dispatch(updateProductStart());
  try {
    const res = await loggedInUserRequest.put(`/products/${id}`);
    dispatch(updateProductSuccess({ id, product }));
  } catch (err) {
    dispatch(updateProductFailure());
  }
};
export const addProduct = async (product: Product, dispatch: Dispatch) => {
  dispatch(addProductStart());
  try {
    const res = await loggedInUserRequest.post(`products/addProduct`, product);
    dispatch(addProductSuccess(res.data));
  } catch (err) {
    dispatch(addProductFailure());
  }
};

export const updateUser = async (user: User, dispatch: Dispatch) => {
  dispatch(updateUserStart());
  try {
    const res = await loggedInUserRequest.put(`/users/${user.id}`, user);

    dispatch(updateUserSuccess({ id: user.id, user }));
  } catch (err) {
    dispatch(updateUserFailure());
  }
};

export const updateOtherUser = async (user: User, dispatch: Dispatch) => {
  dispatch(updateUserStart());
  try {
    const res = await loggedInUserRequest.put(
      `/users/otherUser/${user.id}`,
      user,
    );

    dispatch(updateOtherUserSuccess({ id: user.id, user }));
  } catch (err) {
    dispatch(updateUserFailure());
  }
};

export const getUsers = async (dispatch: Dispatch) => {
  dispatch(getUserStart());
  try {
    const res = await loggedInUserRequest.get("/users/all");

    dispatch(getUserSuccess(res.data));
  } catch (err) {
    dispatch(getUserFailure());
  }
};

export const deleteUser = async (id: string, dispatch: Dispatch) => {
  dispatch(deleteUserStart());
  try {
    const res = await loggedInUserRequest.delete(`/users/${id}`);
    dispatch(deleteUserSuccess(id));
  } catch (err) {
    dispatch(deleteUserFailure());
  }
};
export const addToWishlist = async (
  dispatch: Dispatch,
  userId?: number,
  productId?: number,
) => {
  dispatch(addWishlistStart());
  try {
    const requestBody = {
      userId: userId,
      productId: productId,
    };

    const res = await loggedInUserRequest.post(
      "/users/addToWishlist",
      requestBody,
    );
    dispatch(addWishlistSuccess(res.data));
  } catch (err) {
    dispatch(addWishlistFailure());
  }
};
export const removeFromWishlist = async (
  dispatch: Dispatch,
  wishlistItemId?: number,
  userId?: number,
) => {
  dispatch(removeWishlistStart());
  try {
    const res = await loggedInUserRequest.delete(
      `/users/removeFromWishlist/${wishlistItemId}/${userId}`,
    );
    dispatch(removeWishlistSuccess(res.data));
  } catch (err) {
    dispatch(removeWishlistFailure());
  }
};

export const getWishlist = async (dispatch: Dispatch, userId?: number) => {
  dispatch(getUWishlistStart());
  try {
    const res = await loggedInUserRequest.get(`/users/wishlist/${userId}`);
    console.log(JSON.stringify(res));
    dispatch(getWishlistSuccess(res.data));
  } catch (err) {
    dispatch(getWishlistFailure());
  }
};
