import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

// Ideias retiradas do código do colega Bruno Yamamoto:
//   - forma de renderização do componente <Pokémon />
//   - teste usando um pokémon do arquivo data.js
// link do código: https://github.com/tryber/sd-012-project-react-testing-library/blob/bruno-yamamoto-react-testing/src/tests/Pokemon.test.js

const caterpieData = pokemons[2]; // teste com o pokémon Caterpie
const { name, type, averageWeight: { value, measurementUnit }, image, id } = caterpieData;

beforeEach(() => renderWithRouter(<Pokemon
  pokemon={ caterpieData }
  isFavorite
  // showDetailsLink
/>));

describe('Testa o componente Pokemon.js', () => {
  it('Testa se é renderizado um card com as informações de determinado pokémon', () => {
    expect(screen.getByTestId('pokemon-name').textContent).toBe(name);
    expect(screen.getByTestId('pokemon-type').textContent).toBe(type);

    const averageWeightText = `Average weight: ${value} ${measurementUnit}`;
    expect(screen.getByTestId('pokemon-weight').textContent).toBe(averageWeightText);

    const pokemonImage = screen.getAllByRole('img')[0];
    expect(pokemonImage).toHaveAttribute('src', image);
    expect(pokemonImage).toHaveAttribute('alt', `${name} sprite`);
  });
  it('Testa se o card contém um link de navegação para exibir mais detalhes', () => {
    expect(screen.getByRole('link', { name: 'More details' })).toBeInTheDocument();
  });
  it('Testa redirecionamento para a página de detalhes do Pokémon', () => {
    const { history } = renderWithRouter(<Pokemon
      pokemon={ caterpieData }
      isFavorite={ false }
      showDetailsLink
    />);

    userEvent.click(screen.getAllByRole('link', { name: 'More details' })[1]);

    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${id}`);
  });
  it('Testa se existe um ícone de estrela nos Pokémons favoritados', () => {
    const starImage = screen.getAllByRole('img')[1];
    expect(starImage).toHaveAttribute('src', '/star-icon.svg');
    expect(starImage).toHaveAttribute('alt', `${name} is marked as favorite`);
  });
});
