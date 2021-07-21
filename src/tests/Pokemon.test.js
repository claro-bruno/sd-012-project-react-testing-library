// Requisito fortemente inspirado pelo código maaaravilhoso e limpo do Eric Kreis
// https://github.com/tryber/sd-012-project-react-testing-library/pull/48/commits/e9902675bef12ea5255341014f90bb376d82aae5

import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

const pokemonList = pokemons[8];

describe('Teste componente Pokemon', () => {
  it('Testa se é renderizado um card com determinadas infos na tela', () => {
    renderWithRouter(
      <Pokemon
        pokemon={ pokemonList }
        showDetailsLink
        isFavorite={ false }
      />,
    );
    const { name, type, averageWeight: { measurementUnit, value } } = pokemonList;
    expect(screen.getByTestId('pokemon-name')).toHaveTextContent(name);
    expect(screen.getByTestId('pokemon-type')).toHaveTextContent(type);
    expect(screen.getByTestId('pokemon-weight'))
      .toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);
    const pokeImg = screen.getByAltText(`${name} sprite`);
    const img = 'https://cdn2.bulbagarden.net/upload/2/2c/Spr_5b_148.png';

    expect(pokeImg.src).toBe(img);
  });

  it('Testa se o card contém um link para URL /pokemon/:id', () => {
    const { history } = renderWithRouter(
      <Pokemon
        pokemon={ pokemonList }
        showDetailsLink
        isFavorite={ false }
      />,
    );
    expect(history.location.pathname).toBe('/');
    userEvent.click(screen.getByText(/more details/i));
    expect(history.location.pathname).toBe(`/pokemons/${pokemonList.id}`);
  });

  it('Testa se existe um ícone de estrela nos pokémons favoritados', () => {
    renderWithRouter(
      <Pokemon
        pokemon={ pokemonList }
        showDetailsLink
        isFavorite
      />,
    );
    const favIcon = screen.getByAltText(`${pokemonList.name} is marked as favorite`);
    expect(favIcon).toBeInTheDocument();
    expect(favIcon.src).toBe('http://localhost/star-icon.svg');
  });
});
