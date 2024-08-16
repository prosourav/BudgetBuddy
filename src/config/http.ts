import axios, { AxiosResponse } from 'axios';


const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_APP_API_ENDPOINT}`
});

instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.headers["Accept"] = "application/json";
instance.defaults.timeout = 15000,

  instance.interceptors.request.use(
    function (config) {
      const accessToken = null;
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string, option?: any) => instance.get(url, option).then(responseBody),
  post: (url: string, body?: object, option?: object) => instance.post(url, body, option).then(responseBody),
  patch: (url: string, body?: object) => instance.patch(url, body).then(responseBody),
  put: (url: string, body?: File, header?: object) => axios.put(url, body, header).then(responseBody),
  delete: (url: string) => instance.delete(url).then(responseBody),
};

export default requests;