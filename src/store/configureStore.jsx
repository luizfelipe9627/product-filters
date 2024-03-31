import { configureStore, combineReducers } from "@reduxjs/toolkit";
import products from "./products";

const reducer = combineReducers({ products }); // O combineReducers é responsável por combinar os reducers e armazenar em uma constante chamada reducer.

// Criado uma constante chamada store que recebe o retorno da função configureStore que é responsável por criar a store(armazém) da aplicação.
const store = configureStore({ reducer }); // O configureStore recebe um objeto como parâmetro, e esse objeto deve conter a chave reducer, que recebe o/s reducer/s que será responsável por alterar/atualizar o estado da store.

export default store; // Exporta a constante store.
