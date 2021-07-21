import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pokemon from '../components/Pokemon';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

// const isFav = {
//   4: false,
//   10: false,
//   23: false,
//   25: false,
//   65: false,
//   78: false,
//   143: false,
//   148: false,
//   151: false,
// };

describe('teste do componente pokemon', () => {
  it('testa render do card', () => {
    renderWithRouter(<Pokemon isFavorite={ false } pokemon={ pokemons[0] } />);
    const pokeName = screen.getByTestId('pokemon-name');
    expect(pokeName.innerHTML).toBe('Pikachu');

    const pokeType = screen.getByTestId('pokemon-type');
    expect(pokeType.innerHTML).toBe('Electric');

    const { value, measurementUnit } = pokemons[0].averageWeight;
    const pokeWeight = screen.getByTestId('pokemon-weight');
    expect(pokeWeight.innerHTML).toBe(`Average weight: ${value} ${measurementUnit}`);

    const img = screen.getByRole('img', { name: `${pokemons[0].name} sprite` });
    expect(img).toBeInTheDocument();
    expect(img.src).toBe(pokemons[0].image);
  });

  it('testa link do card', () => {
    const { history } = renderWithRouter(
      <Pokemon isFavorite={ false } pokemon={ pokemons[0] } />,
    );

    const linkDetails = screen.getByRole('link', { name: /More details/i });
    userEvent.click(linkDetails);
    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${pokemons[0].id}`);
  });

  it('testa favoritos do card', () => {
    renderWithRouter(
      <Pokemon isFavorite pokemon={ pokemons[0] } />,
    );

    const favImg = screen.getByRole('img', { name: /is marked as favorite/i });
    expect(favImg).toBeInTheDocument();

    expect(favImg.src).toBe('http://localhost/star-icon.svg');

    expect(favImg.alt).toBe(`${pokemons[0].name} is marked as favorite`);
  });
});
