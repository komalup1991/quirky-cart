import axios from "axios";

const BASE_API_URL = "http://localhost:4000/api/";

let JWT_TOKEN = '';
try {
  //  localStorage.clear();
  const rootPersist = localStorage.getItem("persist:root");
  if (rootPersist) {
    const user = JSON.parse(JSON.parse(rootPersist).user);
    JWT_TOKEN = user.currentUser.accessToken;
    console.log(JWT_TOKEN);
  }
} catch (error) {
  console.error("Error retrieving JWT token:", error);
}

export const publicRequest = axios.create({
    baseURL: BASE_API_URL,
});

export const loggedInUserRequest = axios.create({
    baseURL: BASE_API_URL,
    headers: { token: `Bearer ${JWT_TOKEN}` },
});
