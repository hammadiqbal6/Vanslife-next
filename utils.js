import axios from "axios";

const baseURL = "http://127.0.0.1:8000/api";
const Api = axios.create({
  baseURL: baseURL,
});

export default Api;

// Api.interceptors.request.use(
//   (config) => {
//     if (localStorage.getItem("userToken")) {
//       config.headers["Authorization"] = `Bearer ${localStorage.getItem(
//         "userToken"
//       )}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// Api.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     const { response } = error;
//     if (response.status === 401) {
//       localStorage.removeItem("user");
//       localStorage.removeItem("userToken");
//     }
//     throw error;
//   }
// );
