import axios from "axios";
import { User } from "../register/registerApi";
import {BASE_API} from "../register/registerApi";
const USERS_API = `${BASE_API}/api/auth`;
// const api = axios.create({
//   withCredentials: true
// });
export const login = async (user: any) => {
    const response = await axios.post(`${USERS_API}/login`, user);
    return response.data;
  };