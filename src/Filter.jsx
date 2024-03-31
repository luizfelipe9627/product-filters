import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUniqueColors } from "./store/products";
import { changeFilters } from "./store/products";

const Filter = () => {
  const colors = useSelector(selectUniqueColors); // Está armazenando o retorno da função selectUniqueColors no estado colors.

  const dispatch = useDispatch(); // O dispatch é uma função responsável por disparar uma action para o reducer.

  const [minPrice, setMinPrice] = React.useState(""); // Está criando um estado minPrice e a função setMinPrice que será responsável por atualizar o estado minPrice. O estado inicial é uma string vazia.
  const [maxPrice, setMaxPrice] = React.useState(""); // Está criando um estado maxPrice e a função setMaxPrice que será responsável por atualizar o estado maxPrice. O estado inicial é uma string vazia.
  const [selectedColors, setSelectedColors] = React.useState([]); // Está criando um estado selectedColors e a função setSelectedColors que será responsável por atualizar o estado selectedColors. O estado inicial é um array vazio.

  // O useEffect executa a função anônima sempre que o estado selectedColors mudar ou quando uma ação for disparada.
  React.useEffect(() => {
    dispatch(changeFilters({ name: "colors", value: selectedColors })); // Está disparando a action changeFilters, passando como parâmetro um objeto com o nome do filtro que será utilizado e as opções selecionadas, no caso, as cores selecionadas como payload.
  }, [selectedColors, dispatch]);

  React.useEffect(() => {
    // Está disparando a action changeFilters, passando como parâmetro um objeto com o nome do filtro que será utilizado e os tipos de preços selecionados, no caso, o preço mínimo e o preço máximo como payload.
    dispatch(
      changeFilters({
        name: "prices",
        value: {
          min: Number(minPrice), // Está passando o preço mínimo transformado em número.
          max: Number(maxPrice), // Está passando o preço máximo transformado em número.
        },
      }),
    );
  }, [minPrice, maxPrice, dispatch]);

  // Criado uma função chamada handleChange que recebe um evento target como parâmetro.
  function handleChange({ target }) {
    // Se o input checkbox que disparou(target) o evento estiver marcado, ele executa o if, se não, executa o else.
    if (target.checked) {
      setSelectedColors([...selectedColors, target.value]); // Está atualizando o estado selectedColors, adicionando as cores que já estavam no estado e a cor que foi marcada.
    } else {
      setSelectedColors(
        selectedColors.filter((color) => color !== target.value),
      ); // Está atualizando o estado selectedColors, fazendo um filtro para que quando a cor for diferente da cor que foi desmarcada, ela seja mantida no estado.
    }
  }

  // Criado uma função chamada handleChecked que recebe uma cor como parâmetro, responsável por verificar se a cor passada como parâmetro está no estado selectedColors.
  function handleChecked(color) {
    return selectedColors.includes(color); // Está verificando se a cor passada como parâmetro está no estado selectedColors, se estiver, retorna true, se não, retorna false.
  }

  return (
    <>
      <div className="values">
        <input
          type="number"
          // Está atribuindo o valor do estado username ao input.
          value={minPrice}
          // A cada alteração no input, a função anônima é chamada, e recebe como parâmetro a desestruturação do evento target(acessa o elemento que disparou o evento) e a função atualizadora setMinPrice é chamada, passando como parâmetro o valor(value) digitado no input.
          onChange={({ target }) => setMinPrice(target.value)}
          placeholder="Preço mínimo"
        />
        <input
          type="number"
          // Está atribuindo o valor do estado username ao input.
          value={maxPrice}
          // A cada alteração no input, a função anônima é chamada, e recebe como parâmetro a desestruturação do evento target(acessa o elemento que disparou o evento) e a função atualizadora setMaxPrice é chamada, passando como parâmetro o valor(value) digitado no input.
          onChange={({ target }) => setMaxPrice(target.value)}
          placeholder="Preço máximo"
        />
      </div>

      <div className="colors">
        {/* Está mapeando o array colors, ou seja passando por cada cor do array e armazenando no parâmetro color, e a cada cor, está retornando um input do tipo checkbox e o nome da cor. */}
        {colors.map((color, index) => {
          return (
            <label key={index}>
              <input
                type="checkbox"
                // Está atribuindo o valor da cor atual ao input.
                value={color}
                // Está verificando se a cor clicada está no estado selectedColors, se estiver, o input é marcado, se não, ele não é marcado.
                checked={handleChecked(color)}
                // A cada alteração no input, ou seja, a cada clique no checkbox, a função handleChange é chamada.
                onChange={handleChange}
              />
              {color}
            </label>
          );
        })}
      </div>
    </>
  );
};

export default Filter;
