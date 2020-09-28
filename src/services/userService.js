import http from "./httpService";

const apiEndPoint = `${process.env.REACT_APP_API_URL}users`;

export const register = ({ email, password, firstname, lastname }) => {
  return http.post(apiEndPoint, {
    email,
    password,
    firstname,
    lastname,
  });
};
