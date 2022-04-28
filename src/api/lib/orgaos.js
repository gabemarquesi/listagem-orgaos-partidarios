import {formatDate} from "../../utils/formatters";
import axiosClient from "../apiClient";

const DATA_INICIO_VIGENCIA = new Date(2019, 0, 1);
const DATA_FIM_VIGENCIA = new Date(2021, 4, 30);

export async function getListOrgaos(lista, typeList) {
  const data = await fetchOrgaos(lista);

  const dateFilteredList = filterListByDate(data);

  const resultList = filterListByTipoOrgao(dateFilteredList, typeList);

  return resultList;
}

async function fetchOrgaos(list) {
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

function filterListByDate(data) {
  const resultList = [];

  data.forEach((item) => {
    const dataInicioVigencia = formatDate(item.dataInicioVigencia);
    const dataFimVigencia = formatDate(item.dataFimVigencia);

    if (dataInicioVigencia && dataFimVigencia) {
      const dataInicio = dataInicioVigencia;
      const dataFim = dataFimVigencia;

      if (dataInicio >= DATA_INICIO_VIGENCIA && dataFim <= DATA_FIM_VIGENCIA) {
        resultList.push(item);
      }
    }
  });
  return resultList;
}

function filterListByTipoOrgao(data, typeList) {
  const resultList = [];

  data.forEach((item) => {
    const tipoOrgao = item.tipoOrgao.split(" ")[1];
    if (typeList.includes(tipoOrgao)) {
      resultList.push(item);
    }
  });
  return resultList;
}
