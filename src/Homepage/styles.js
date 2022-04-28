import styled from "styled-components";

export const HeaderTitle = styled.h1`
  font-size: 2em;
  height: 80px;
  text-align: center;
  color: black;
  font-family: "Courier New", Courier, monospace;
  margin: 25px;
  background-color: lightgray;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FilterContainer = styled.div`
  height: 400px;
  border: 0.8px solid gray;
  margin: 25px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export const FilterOption = styled.div`
  font-weight: 700;
  font-size: 1.2em;
  div {
    font-weight: normal;
    font-size: initial;
  }
`;

export const AnalyticsContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 16px;
  span {
    color: green;
  }
`;

export const StateContentContainer = styled.div`
  display: flex;
  justify-content: center;
  color: gray;
  margin-top: 35px;
`;

export const FilterCategorySection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  margin-left: 15px;
  Form {
    margin-right: 60px;
  }
`;

export const EstadosList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;
