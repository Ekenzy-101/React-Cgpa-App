import jwtDecode from "jwt-decode";
import { TOKEN_KEY } from "../utils/constant";
import http from "./httpService";

const apiEndpoint = `${process.env.REACT_APP_API_URL}auth`;

export const login = async (email, password) => {
  const { data: jwt } = await http.post(apiEndpoint, { email, password });
  localStorage.setItem(TOKEN_KEY, jwt);
};

export const loginWithJwt = (jwt) => {
  localStorage.setItem(TOKEN_KEY, jwt);
};

export const logout = async () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const getCurrentUser = () => {
  try {
    const jwt = localStorage.getItem(TOKEN_KEY);
    const user = jwtDecode(jwt);
    return user;
  } catch (ex) {
    return null;
  }
};
