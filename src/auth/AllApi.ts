import axios from "axios";

const BASE_API_URL = process.env.BASE_API_URL;
const API = `${BASE_API_URL}/api/`;



let JWT_TOKEN = '';
try {
  // localStorage.clear();
  const rootPersist = localStorage.getItem("persist:root");

  if (rootPersist) {
  
    const user = JSON.parse(JSON.parse(rootPersist).user);

    JWT_TOKEN = user.accessToken;
   
  }
} catch (error) {
  console.error("Error retrieving JWT token:", error);
}

export const publicRequest = axios.create({
    baseURL: API,
});

export const loggedInUserRequest = axios.create({
    baseURL: API,
    headers: { token: `Bearer ${JWT_TOKEN}` },
});
