import { User, deleteUserFailure, deleteUserStart, deleteUserSuccess, getUserFailure, getUserStart, getUserSuccess, loginFailure, loginStart, loginSuccess, logoutSuccess, updateUserFailure, updateUserStart, updateUserSuccess } from "../redux/userRedux";
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

  export const login = async (dispatch: Dispatch<any>, user: UserCredentials) => {
    dispatch(loginStart());
    try {
      console.log("user = ", user);
      const res = await publicRequest.post("/auth/login", user);
      console.log("LOGGING res = ", res.data);
      if (res.status === 200) {
        console.log("LOGGING loginSuccess");
        dispatch(loginSuccess(res.data));
        return res.data;  // Return the user data upon successful login
      } else {
        console.log("LOGGING loginFailure");
        // Handle other HTTP status codes as needed
        dispatch(loginFailure());
        return null;  // Return null to indicate unsuccessful login
      }
    } catch (error) {
      console.error('Login error:', error);
      dispatch(loginFailure());
      return null;  // Return null to handle exceptions
    }
};

export const register = async (dispatch:Dispatch, user:UserCredentials, navigate: (path: string) => void) => {
  // dispatch(loginStart());
  console.log("in register");

  try {
      const res = await publicRequest.post("/auth/register", user);
      console.log("in register res, = ", res.status);
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
    const res = await loggedInUserRequest.delete(`/products/${id}`);
    dispatch(deleteProductSuccess(id));
  } catch (err) {
    dispatch(deleteProductFailure());
  }
};

export const updateProduct = async (id:string, product:Product, dispatch:Dispatch) => {
  dispatch(updateProductStart());
  try {
    const res = await loggedInUserRequest.put(`/products/${id}`);
    dispatch(updateProductSuccess({ id, product }));
  } catch (err) {
    dispatch(updateProductFailure());
  }
};
export const addProduct = async (product:Product, dispatch:Dispatch) => {
  dispatch(addProductStart());
  try {
    
    const res = await loggedInUserRequest.post(`products/addProduct`, product);
    dispatch(addProductSuccess(res.data));
  } catch (err) {
    dispatch(addProductFailure());
  }
};

export const updateUser = async (user:User, dispatch:Dispatch) => {
  dispatch(updateUserStart());
  try {
  
    const res = await loggedInUserRequest.put(`/users/${user.id}`, user);
   
    dispatch(updateUserSuccess({ id: user.id, user }));
  } catch (err) {
    dispatch(updateUserFailure());
  }
}
export const getUsers = async (dispatch:Dispatch) => {
  dispatch(getUserStart());
  try {
    const res = await loggedInUserRequest.get("/users/all");
    console.log("hey",JSON.stringify(res.data));
    dispatch(getUserSuccess(res.data));
  } catch (err) {
    dispatch(getUserFailure());
  }
};

export const deleteUser = async (id:string, dispatch:Dispatch) => {
  dispatch(deleteUserStart());
  try {
    const res = await loggedInUserRequest.delete(`/users/${id}`);
    dispatch(deleteUserSuccess(id));
  } catch (err) {
    dispatch(deleteUserFailure());
  }
};
