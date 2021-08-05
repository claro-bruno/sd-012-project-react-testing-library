import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import Pokemon from '../components/Pokemon';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

const POKEMON_TEST = pokemons[0];
const MORE_DETAILS = 'More details';
const TRUE = true;

const renderPokemonComponent = () => {
  beforeEach(() => {
    renderWithRouter(
      <Pokemon
        pokemon={ POKEMON_TEST }
        isFavorite={ TRUE }
      />,
    );
  });
};

describe('Teste se é renderizado um card com as informações de determinado pokémon.',
  () => {
    renderPokemonComponent();

    test('O nome correto do Pokémon deve ser mostrado na tela', () => {
      const pokemonName = screen.getByText(POKEMON_TEST.name);
      expect(pokemonName).toBeInTheDocument();
    });

    test('O tipo correto do pokémon deve ser mostrado na tela', () => {
      const pokemonType = screen.getByText(POKEMON_TEST.type);
      expect(pokemonType).toBeInTheDocument();
    });

    test('O peso médio do pokémon deve ser exibido com um texto no formato '
    + 'Average weight: <value> <measurementUnit>`; '
    + 'onde `<value>` e `<measurementUnit>` são, respectivamente, '
    + 'o peso médio do pokémon e sua unidade de medida.',
    () => {
      const { averageWeight } = POKEMON_TEST;
      const pokemonWeight = screen
        .getByText(
          `Average weight: ${averageWeight.value} ${averageWeight.measurementUnit}`,
        );
      expect(pokemonWeight).toBeInTheDocument();
    });

    test('A imagem do Pokémon deve ser exibida. '
    + 'Ela deve conter um atributo `src` com a URL da imagem e '
    + 'um atributo `alt` com o texto `<name> sprite`, onde `<name>` é o nome do pokémon',
    () => {
      const pokemonImage = screen.getByAltText(`${POKEMON_TEST.name} sprite`);
      expect(pokemonImage).toBeInTheDocument();
      expect(pokemonImage).toHaveAttribute('src', POKEMON_TEST.image);
    });
  });

test('Teste se o card do Pokémon indicado na Pokédex contém '
  + 'um link de navegação para exibir detalhes deste Pokémon. '
  + 'O link deve possuir a URL `/pokemons/<id>`, onde `<id>` é o id do Pokémon exibido',
() => {
  renderWithRouter(
    <Pokemon
      pokemon={ POKEMON_TEST }
      isFavorite={ TRUE }
    />,
  );
  const linkToMoreDetails = screen.getByText(MORE_DETAILS);
  expect(linkToMoreDetails).toBeInTheDocument();
  expect(linkToMoreDetails).toHaveAttribute('href', `/pokemons/${POKEMON_TEST.id}`);
});

test('Teste se ao clicar no link de navegação do Pokémon, '
+ 'é feito o redirecionamento da aplicação para a página de detalhes de Pokémon.'
+ 'Teste também se a URL exibida no navegador muda para '
+ '/pokemon/<id>, onde <id> é o id do Pokémon cujos detalhes se deseja ver',
() => {
  const { history } = renderWithRouter(
    <Pokemon
      pokemon={ POKEMON_TEST }
      isFavorite={ TRUE }
    />,
  );
  const linkToMoreDetails = screen.getByText(MORE_DETAILS);
  fireEvent.click(linkToMoreDetails);
  const currentPath = history.location.pathname;
  expect(currentPath).toBe(`/pokemons/${POKEMON_TEST.id}`);
});

describe('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
  renderPokemonComponent();

  test('O ícone deve ser uma imagem com o atributo src contendo o caminho /star-icon.svg',
    () => {
      const favoriteImage = screen.getAllByRole('img')[1];
      expect(favoriteImage).toHaveAttribute('src', '/star-icon.svg');
    });

  test('A imagem deve ter o atributo alt igual a <pokemon> is marked as favorite, '
  + 'onde <pokemon> é o nome do Pokémon exibido.',
  () => {
    const favoriteImage = screen.getAllByRole('img')[1];
    expect(favoriteImage)
      .toHaveAttribute('alt', `${POKEMON_TEST.name} is marked as favorite`);
  });
});
