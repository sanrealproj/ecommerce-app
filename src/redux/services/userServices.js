import axios from "axios";
const { CancelToken, isCancel } = axios;
const axiosInstance = axios.create({
  headers: {
    "Content-type": "application/json",
  },
});

const requestGet = (path, config = undefined) => {
  axiosInstance
    .get(path, config)
    .then((response) => response)
    .catch((error) => {
      return Promise.reject(error.response);
    });
};

const requestPost = (path, json, config = undefined) => {
  axiosInstance
    .post(path, json, config)
    .then((response) => response)
    .catch((error) => {
      return Promise.reject(error.response);
    });
};

const requestPut = (path, json, config = undefined) => {
  axiosInstance
    .put(path, json, config)
    .then((response) => response)
    .catch((error) => {
      return Promise.reject(error.response);
    });
};

const requestDelete = (path, json, config = undefined) => {
  axiosInstance
    .delete(path, json, config)
    .then((response) => response)
    .catch((error) => {
      return Promise.reject(error.response);
    });
};

export default requestGet;