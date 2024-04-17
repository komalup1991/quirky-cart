import axios from "axios";

const BASE_API_URL = "http://localhost:4000/api/";
const JWT_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJ3aW5uaSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcxMzMzMjE2OSwiZXhwIjoxNzEzNTQ4MTY5fQ.XUH_T6BEiXG-PhaWIDVRH9KK1pR92Myv4yfPiIuGfvU";

export const publicRequest = axios.create({
    baseURL: BASE_API_URL,
});
export const loggedInUserRequest = axios.create({
    baseURL: BASE_API_URL,
    headers:{ token:`Bearer ${JWT_TOKEN}`},
});


