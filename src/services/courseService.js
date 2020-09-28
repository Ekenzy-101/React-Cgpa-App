import http from "./httpService";

const apiEndPoint = `${process.env.REACT_APP_API_URL}courses`;

export const getCourses = () => {
  return http.get(`${apiEndPoint}/me`);
};

export const getCourse = (id) => {
  return http.get(`${apiEndPoint}/${id}`);
};

export const saveCourse = (course) => {
  if (course._id) {
    let data = { ...course };
    delete data._id;
    return http.put(`${apiEndPoint}/${course._id}`, data);
  }
  return http.post(apiEndPoint, course);
};

export const deleteCourse = (course) => {
  return http.delete(`${apiEndPoint}/${course._id}`);
};
