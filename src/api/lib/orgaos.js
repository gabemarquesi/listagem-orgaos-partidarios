import axios from "axios";

export const axiosClient = axios.create({
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

export async function fetchOrgaos(list) {
  const resultList = [];
  await Promise.all(list.map((lista) => axiosClient.get(lista))).then(
    (data) => {
      data.forEach((item, index) => {
        resultList.push(...item.data);
      });
    }
  );
  return resultList;
}

export async function getListOrgaos(lista, typeList) {
  const data = await fetchOrgaos(lista);

  const dateFilteredList = filterListByDate(data);

  const resultList = filterListByTypeOrgao(dateFilteredList, typeList);

  return resultList;
}

function filterListByDate(data) {
  const resultList = [];

  data.forEach((item) => {
    const dataInicioVigencia = formatDate(item.dataInicioVigencia);
    const dataFimVigencia = formatDate(item.dataFimVigencia);

    if (dataInicioVigencia && dataFimVigencia) {
      const dataInicio = new Date(dataInicioVigencia);
      const dataFim = new Date(dataFimVigencia);

      if (
        dataInicio >= new Date(2019, 1, 1) &&
        dataFim <= new Date(2021, 4, 30)
      ) {
        resultList.push(item);
      }
    }
  });
  return resultList;
}

function filterListByTypeOrgao(data, typeList) {
  const resultList = [];

  data.forEach((item) => {
    const tipoOrgao = item.tipoOrgao.split(" ")[1];
    if (typeList.includes(tipoOrgao)) {
      resultList.push(item);
    }
  });
  return resultList;
}

function formatDate(rawDate) {
  rawDate = rawDate.split("/");
  rawDate = rawDate.reverse();

  const date = new Date(rawDate[0], rawDate[1] - 1, rawDate[2]);
  return date;
}
