import axios from "axios";

const axiosClient = axios.create({
  baseURL: `https://sgip3.tse.jus.br/sgip3-consulta/api/v1/orgaoPartidario/`,
});

export default axiosClient;
