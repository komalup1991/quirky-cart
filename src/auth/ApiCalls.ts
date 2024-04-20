import { loginFailure, loginStart, loginSuccess } from "../redux/userRedux";
import { publicRequest, loggedInUserRequest } from "./AllApi";
import { Dispatch } from "redux";
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
} from "../redux/productRedux";
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

// The login function that uses Redux and Axios for handling the login process
export const login = async (dispatch: Dispatch, user: UserCredentials) => {
    dispatch(loginStart());
    try {
        const res = await publicRequest.post("/auth/login", user);
        if (res.status === 200) {
            dispatch(loginSuccess(res.data));
        } else {
            dispatch(loginFailure());
        }
    } catch (err) {
        dispatch(loginFailure());
    }
};

export const getProducts = async (dispatch:Dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await publicRequest.get("/products");
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(getProductFailure());
  }
};

export const deleteProduct = async (id:string, dispatch:Dispatch) => {
  dispatch(deleteProductStart());
  try {
    // const res = await userRequest.delete(`/products/${id}`);
    dispatch(deleteProductSuccess(id));
  } catch (err) {
    dispatch(deleteProductFailure());
  }
};

export const updateProduct = async (id:string, product:Product, dispatch:Dispatch) => {
  dispatch(updateProductStart());
  try {
    // update
    dispatch(updateProductSuccess({ id, product }));
  } catch (err) {
    dispatch(updateProductFailure());
  }
};
export const addProduct = async (product:Product, dispatch:Dispatch) => {
  dispatch(addProductStart());
  try {
    const res = await loggedInUserRequest.post(`/products`, product);
    dispatch(addProductSuccess(res.data));
  } catch (err) {
    dispatch(addProductFailure());
  }
};


