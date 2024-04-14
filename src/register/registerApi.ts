import axios from "axios";
export const BASE_API = process.env.REACT_APP_API_BASE;
export const USERS_API = `${BASE_API}/api/auth`;
export interface User { _id: string; username: string; password: string; role: string;
firstName: string, lastName: string };

// const api = axios.create({
//   withCredentials: true
// });
export const register = async (user: any) => {
    const response = await axios.post(`${USERS_API}/register`, user);
    return response.data;
  };