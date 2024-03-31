import { createSlice } from "@reduxjs/toolkit";
import data from "../data";
import { createSelector } from "reselect";

// O createSlice é responsável por criar um slice. O slice é um conjunto de ações e reducers que são responsáveis por alterar o estado da store.
const slice = createSlice({
  name: "products", // Nome do slice.
  // Estado inicial do slice, nesse caso um objeto.
  initialState: {
    data, // Dados iniciais.
    // Filtros iniciais.
    filters: {
      colors: [],
      prices: {
        min: 0,
        max: 0,
      },
    },
  },
  // Reducers são funções que alteram o estado do slice.
  reducers: {
    // Criado uma função chamada changeFilters que recebe o estado e a action como parâmetros, essa função é responsável por alterar o estado do slice.
    changeFilters(state, action) {
      state.filters[action.payload.name] = action.payload.value; // Está acessando os filtros do estado pegando o nome do filtro que está na action ou seja, o nome do filtro que será alterado e está atribuindo o valor do filtro que está na action.
    },
  },
});

export const { changeFilters } = slice.actions; // Está exportando as actions do slice.

const selectProductsData = (state) => state.products.data; // Está criando uma função que recebe o estado como parâmetro e retorna o estado products.data.

// Criado uma função chamada selectUniqueColors que recebe o createSelector como retorno, que é responsável por criar um seletor utilizando memoização, ou seja, ele é utilizado para armazenar o resultado de uma função e só executar a função novamente se o estado for alterado.
export const selectUniqueColors = createSelector(
  // O createSelector recebe dois parâmetros, o primeiro é uma função que recebe o estado como parâmetro e como segundo parâmetro recebe a função que será executada quando o estado for alterado.
  [selectProductsData], // Como primeiro parâmetro é passado um array com as funções que serão executadas quando o estado for alterado.

  // Como segundo parâmetro é passado uma função que recebe o retorno da função passada no primeiro parâmetro.
  (productsData) => {
    return Array.from(new Set(productsData.map(({ color }) => color))); // Está criando um novo array com as cores únicas dos produtos, ou seja, está pegando as cores dos produtos e armazenando em um array, e depois está removendo as cores repetidas.
  },
);

export default slice.reducer; // Exporta o reducer do slice.
