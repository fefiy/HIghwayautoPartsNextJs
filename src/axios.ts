import axios from "axios";
// import { store } from "./redux/store";
// import { userLogout  } from "./redux/auth/authSlice";
// import { toast } from "react-toastify";

const baseURL = "http://localhost:3000/api";

export const privateAxios = axios.create({
  baseURL: baseURL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

// const getTokenFromRedux = () => {
//   // console.log("this is token from get token from redux", store.getState().auth.token);
//   return store.getState().auth.token;
// };

// privateAxios.interceptors.request.use((config) => {
//   const token = getTokenFromRedux();
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// }, (error) => {
//   return Promise.reject(error);
// });

// privateAxios.interceptors.response.use((response) => {
//   return response;
// }, (error) => {
//   if (error.response && error.response.status === 403) {
//     toast.error("Your Token is Expire Please Login")
//     console.error("Token is not valid. Please log in again.");
//     store.dispatch(userLogout()); 
//   }
//   return Promise.reject(error);
// });

export const publicAxios = axios.create({
  baseURL: baseURL,
});
