import { loginFailure, loginStart, loginSuccess, logoutSuccess } from "../redux/userRedux";
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
      console.log("dispatch "+ dispatch);
      console.log("UserCredentials " + user);
        const res = await publicRequest.post("/auth/login", user);
        if (res.status === 200) {
          console.log(res.data.id);
            dispatch(loginSuccess(res.data));
        } else {
            dispatch(loginFailure());
        }
    } catch (err) {
        dispatch(loginFailure());
    }
};

export const register = async (dispatch:Dispatch, user:UserCredentials, navigate: (path: string) => void) => {
  // dispatch(loginStart());
  try {
      const res = await publicRequest.post("/auth/register", user);
      if (res.status === 200 || res.status === 201) {
          navigate("/login");
      } else {
          dispatch(loginFailure());
      }
  } catch (err) {
      console.error("Registration error:", err); // More detailed error logging
      dispatch(loginFailure());
  }
};


export const logout = (dispatch: Dispatch, navigate: (path: string) => void) => {
  localStorage.clear();
  dispatch(logoutSuccess());

  persistor.purge().then(() => {
    console.log("Purged persistor storage");
    navigate('/'); 
  });
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


