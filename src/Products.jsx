import React from "react";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";

// Criado uma função currying chamada filterColors que recebe um parâmetro colors, que é um array de cores e retorna uma função que recebe um produto como parâmetro, sendo os produtos do array de produtos(data) filtrado.
const filterColors = (colors) => (product) =>
  !colors.length || colors.includes(product.color); // Se o array de cores selecionadas no filtro estiver vazio, ou seja, não tiver nenhuma cor selecionada, ele retorna true fazendo com que todos os produtos sejam retornados, se não, ele verifica se a cor do produto está no array de cores selecionadas, se estiver, ele retorna true, se não, retorna false. Nesse caso essa função tem que ser chamada utilizando o filter para retornar um novo array com os produtos que atendem a condição.

// Criado uma função currying chamada filterPrices que recebe um parâmetro prices, que é um objeto com o preço mínimo e o preço máximo e retorna uma função que recebe um produto como parâmetro, sendo os produtos do array de produtos(data) filtrado.
const filterPrices = (prices) => (product) =>
  (!prices.max || product.price <= prices.max) &&
  (!prices.min || product.price >= prices.min); // Se o preço máximo e o preço mínimo forem iguais a zero, ou seja, não tiver nenhum preço selecionado, ele retorna true fazendo com que todos os produtos sejam retornados. Caso contrário, ele verifica se o preço do produto é menor ou igual ao preço máximo e se o preço do produto é maior ou igual ao preço mínimo, se as duas condições forem verdadeiras, ele retorna true, se não, retorna false. Nesse caso essa função tem que ser chamada utilizando o filter para retornar um novo array com os produtos que atendem a condição.

const selectProductsData = (state) => state.products.data; // Está criando uma função que recebe o estado como parâmetro e retorna o valor da propriedade data dentro do estado products.
const selectFilterColors = (state) => state.products.filters.colors; // Está criando uma função que recebe o estado como parâmetro e retorna o valor da propriedade colors que está dentro da propriedade filters do estado products.
const selectedFilterPrices = (state) => state.products.filters.prices; // Está criando uma função que recebe o estado como parâmetro e retorna o valor da propriedade prices que está dentro da propriedade filters do estado products.

// Criado uma função chamada filterProducts que recebe o createSelector como retorno, que é responsável por criar um seletor utilizando memoização, ou seja, ele é utilizado para armazenar o resultado de uma função e só executar a função novamente se o estado for alterado.
const filterProducts = createSelector(
  [selectProductsData, selectFilterColors, selectedFilterPrices], // Como primeiro parâmetro é passado um array com as funções que serão executadas quando o estado for alterado.

  // Como segundo parâmetro é passado uma função que recebe os retornos das funções passadas no primeiro parâmetro.
  (products, colors, prices) => {
    return products.filter(filterColors(colors)).filter(filterPrices(prices)); // Está retornando um novo array com os produtos que possuem a cor selecionada no filtro e está filtrando os produtos que possuem o preço selecionado no filtro.
  },
);

const Products = () => {
  const data = useSelector(filterProducts); // Está armazenando o retorno da função filterColors, que no caso é um novo array com os produtos que possuem a cor selecionada no filtro e armazenando na variável data.

  return (
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Cor</th>
          <th>Preço</th>
        </tr>
      </thead>

      <tbody>
        {/* Tem que ser o map e não o forEach, pois o map retorna um novo array com as imagens, enquanto o forEach não retorna nada. */}
        {data.map(({ id, name, color, price }) => {
          return (
            // A cada iteração ele retorna um li com o título da foto.
            <tr key={id}>
              <th>{name}</th>
              <th>{color}</th>
              <th>{price}</th>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Products;
