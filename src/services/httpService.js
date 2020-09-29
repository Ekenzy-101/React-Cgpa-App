import axios from "axios";
import { TOKEN_KEY } from "../utils/constant";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    common: {
      "Access-Control-Allow-Origin": "*",
    },
  },
});

inst;

instance.defaults.headers.common["x-auth-token"] = localStorage.getItem(
  TOKEN_KEY
);

instance.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (expectedError) {
    // console.log("Logging the error", error);
  }

  return Promise.reject(error);
});

export default {
  get: instance.get,
  post: instance.post,
  put: instance.put,
  delete: instance.delete,
};
