import axios, { AxiosError, AxiosResponse } from "axios";
import { Alert } from "react-native";

const BASE_URL = "https://react-http-e1048-default-rtdb.europe-west1.firebasedatabase.app/";

axios.defaults.baseURL = BASE_URL;

axios.defaults.withCredentials = false;

axios.interceptors.request.use((config) => {
  //console.log(config);
  //console.log(config.baseURL + axios.getUri(config));
  //const token = store.getState().account.user?.token;
  // if (token) {
  //   config.headers.Authorization = `Bearer ${token}`;
  // }
  return config;
});

axios.interceptors.response.use(
  async (response) => {
    return response;
  },
  (error) => {
    console.log("Response interceptor log:" + error);
    const { data, status } = error.response;
    if (status === 400) {
      if (data.errors) {
        const modelStateErrors = [];
        for (const key in data.errors) {
          if (data.errors[key]) {
            modelStateErrors.push(data.errors[key]);
          }
        }
        throw modelStateErrors.flat();
      }
    } else {
      console.log("Response Interceptor else: " + data);
    }
    return Promise.reject(error.response);
  }
);

const getResponseBody = (response) => response.data;

const requests = {
  get: (url) => axios.get(url).then(getResponseBody),
  post: (url, body) => axios.post(url, body).then((response) => response.data),
  put: (url, body) => axios.put(url, body).then((response) => response.data),
  delete: (url) => axios.delete(url).then((response) => response.data),
};

const Comments = {
  getComments: () => requests.get("comments.json"),
};

const Products = {
  getProducts: () => requests.get("products.json"),
  postProduct: (data) => requests.post("products.json", data),
  putProduct: (data) => requests.put(`products/${data.key}.json`, data.product),
  deleteProduct: (id) => requests.delete(`products/${id}.json`),
};

const Orders = {
  getOrders: (ownerId) => requests.get(`orders/${ownerId}.json`),
  postOrder: (data) => requests.post(`orders/${data.ownerId}.json`, data.order)
}

const agent = {
  Comments,
  Products,
  Orders
};

export default agent;
