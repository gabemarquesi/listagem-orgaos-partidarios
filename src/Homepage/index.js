import React, {useEffect, useState} from "react";
import {Form, Button} from "react-bootstrap";
import {
  HeaderTitle,
  FilterContainer,
  AnalyticsContainer,
  StateContentContainer,
  FilterCategorySection,
  EstadosList,
} from "./styles";
import {MixedCheckbox} from "@reach/checkbox";
import "bootstrap/dist/css/bootstrap.min.css";

import {Spinner, Table} from "react-bootstrap";
import {getListOrgaos} from "../api/lib/orgaos";
import DatePicker, {registerLocale} from "react-datepicker";
import pt from "date-fns/locale/pt-BR";

import "react-datepicker/dist/react-datepicker.css";

export default function Homepage() {
  let [estados, setEstados] = useState({
    AC: false,
    AL: false,
    AP: false,
    AM: false,
    BA: false,
    CE: false,
    ES: false,
    GO: false,
    MA: false,
    MT: false,
    MS: false,
    MG: false,
    PA: false,
    PB: false,
    PR: false,
    PE: false,
    PI: false,
    RJ: false,
    RN: false,
    RS: false,
    RO: false,
    RR: false,
    SC: false,
    SP: false,
    SE: false,
    TO: false,
  });
  const [isLoading, setLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);
  const [data, setData] = useState();
  const [list, setList] = useState([]);
  const [listType, setListType] = useState([]);
  const [startDate, setStartDate] = useState(new Date(2019, 0, 1));
  const [finishDate, setFinishDate] = useState(new Date(2021, 3, 30));

  registerLocale("pt", pt);

  useEffect(() => {
    getList();
  }, [list]);

  async function getList() {
    if (startDate > finishDate) {
      alert(
        "A data do início da vigência deve ser menor que a data de fim da vigência"
      );
      setLoading(false);
      setIsEmpty(true);
      return;
    }
    const formattedList = await getListOrgaos(
      list,
      listType,
      startDate,
      finishDate
    );

    setData(formattedList);
    setLoading(false);
    formattedList.length > 0 ? setIsEmpty(false) : setIsEmpty(true);
  }

  function handleClick() {
    setLoading(true);
    var listaEstados = [];
    var selecionado = document.forms["estados"].elements["estados"];
    for (var i = 0, cbLen = selecionado.length; i < cbLen; i++) {
      if (selecionado[i].checked) {
        listaEstados.push(selecionado[i].value);
      }
    }

    var partidos = [];
    var partidoSelecionado = document.forms["partido"].elements["partido"];
    for (
      var j = 0, partidoLen = partidoSelecionado.length;
      j < partidoLen;
      j++
    ) {
      if (partidoSelecionado[j].checked) {
        partidos.push(partidoSelecionado[j].value);
      }
    }

    var tipoOrgao = [];
    var orgaoSelecionado = document.forms["tipo-orgao"].elements["tipo-orgao"];
    for (var z = 0, orgaoLen = orgaoSelecionado.length; z < orgaoLen; z++) {
      if (orgaoSelecionado[z].checked) {
        tipoOrgao.push(orgaoSelecionado[z].value);
      }
    }
    setListType(tipoOrgao);

    var lista = [];
    listaEstados.map((estado) =>
      partidos.map((partido) =>
        lista.push(
          "consulta?isComposicoesHistoricas=true&nrZona=0&sgUe=&sgUeSuperior=" +
            estado +
            "&sqPartido=" +
            partido +
            "&tpAbrangencia=83"
        )
      )
    );

    if (
      listaEstados.length > 0 &&
      partidos.length > 0 &&
      tipoOrgao.length > 0
    ) {
      setList(lista);
    } else {
      alert("Selecione pelo menos um estado, partido e tipo de orgão");
      setLoading(false);
      setIsEmpty(true);
    }
  }

  let todosEstadosSelecionados = Object.keys(estados).every(
    (estado) => estados[estado] === true
  );
  let estadosSelecionados = todosEstadosSelecionados
    ? false
    : Object.keys(estados).some((estado) => estados[estado] === true);

  let parentIsChecked = todosEstadosSelecionados
    ? true
    : estadosSelecionados
    ? "mixed"
    : false;

  function handleParentChange(event) {
    setEstados(
      Object.keys(estados).reduce(
        (state, estado) => ({
          ...state,
          [estado]: !todosEstadosSelecionados,
        }),
        {}
      )
    );
  }

  function handleChildChange(event) {
    let {checked, value} = event.target;
    setEstados({
      ...estados,
      [value]: checked,
    });
  }

  return (
    <>
      <HeaderTitle>Listagem de Orgãos Partidários</HeaderTitle>
      <FilterContainer>
        <FilterCategorySection>
          <Form name="partido">
            <legend>Partidos</legend>
            <div>
              <input
                style={{marginRight: "2px"}}
                type="checkbox"
                id="partido"
                name="DEM"
                value="25"
              />
              <label>DEM</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="partido"
                name="PSL"
                value="17"
                style={{marginRight: "2px"}}
              />
              <label>PSL</label>
            </div>
          </Form>
          <Form name="tipo-orgao">
            <legend>Tipo orgão</legend>
            <div>
              <input
                type="checkbox"
                id="tipo-orgao"
                name="definitivo"
                value="definitivo"
                defaultChecked={true}
                style={{marginRight: "2px"}}
              />
              <label>Definitivo</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="tipo-orgao"
                name="provisorio"
                value="provisório"
                defaultChecked={true}
                style={{marginRight: "2px"}}
              />
              <label>Provisório</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="tipo-orgao"
                name="comissao"
                value="interventora"
                defaultChecked={true}
                style={{marginRight: "2px"}}
              />
              <label>Comissão interventora</label>
            </div>
          </Form>
          <Form name="data">
            <legend>Data</legend>
            <span>Início</span>
            <DatePicker
              locale={pt}
              selected={startDate}
              onChange={(date: Date) => setStartDate(date)}
            />
            <br />
            <br />
            <span>Fim</span>
            <DatePicker
              locale={pt}
              selected={finishDate}
              onChange={(date: Date) => setFinishDate(date)}
            />
          </Form>
        </FilterCategorySection>
        <Form name="estados" style={{marginLeft: "15px"}}>
          <legend>Estados</legend>
          <label>
            <MixedCheckbox
              style={{marginRight: "2px"}}
              value="estados"
              checked={parentIsChecked}
              onChange={handleParentChange}
            />
            {todosEstadosSelecionados ? "Desmarcar" : "Marcar"} todos estados
          </label>
          <br />
          <br />
          <EstadosList>
            {Object.entries(estados).map(([value, state]) => (
              <li key={value}>
                <label>
                  <MixedCheckbox
                    style={{marginRight: "2px"}}
                    name="estados"
                    value={value}
                    checked={state}
                    onChange={handleChildChange}
                  />
                  {value}
                </label>
              </li>
            ))}
          </EstadosList>
        </Form>
        <br />
        <Button onClick={handleClick}>Gerar lista</Button>
      </FilterContainer>
      {!isEmpty && (
        <AnalyticsContainer className="analytics">
          <h4>
            Quantidade de orgãos nesta lista: <span>{data.length}</span>
          </h4>
        </AnalyticsContainer>
      )}
      <Table striped>
        <thead>
          <tr>
            <th>#</th>
            <th>Partido</th>
            <th>Tipo Orgão</th>
            <th>UF</th>
            <th>Município</th>
            <th>Início Vigência</th>
            <th>Fim Vigência</th>
            <th>Situações</th>
            <th>Siuação Vigência</th>
          </tr>
        </thead>
        {!isLoading &&
          !isEmpty &&
          data.map((item, index) => {
            return (
              <tbody key={index}>
                <tr>
                  <td>#</td>
                  <td>{item.numero}</td>
                  <td>{item.tipoOrgao}</td>
                  <td>{item.uf}</td>
                  <td>{item.municipio}</td>
                  <td>{item.dataInicioVigencia}</td>
                  <td>{item.dataFimVigencia}</td>
                  <td>{item.situacaoiVigencia}</td>
                  <td>{item.situacoes[0].split(";")}</td>
                </tr>
              </tbody>
            );
          })}
      </Table>
      {isEmpty && !isLoading ? (
        <StateContentContainer>
          <h5>Não há dados a serem mostrados</h5>
        </StateContentContainer>
      ) : (
        isLoading && (
          <StateContentContainer>
            <Spinner animation="border" variant="primary" />
          </StateContentContainer>
        )
      )}
    </>
  );
}
