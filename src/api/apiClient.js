import axios from "axios";

const axiosClient = axios.create({
  baseURL: `https://sgip3.tse.jus.br/sgip3-consulta/api/v1/orgaoPartidario/`,
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosClient;
