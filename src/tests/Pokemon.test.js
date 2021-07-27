import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pokemon from '../components/Pokemon';
import renderWithRouter from '../etc/renderWithRouter';

import pokemons from '../data';

describe('Pokemon.js', () => {
  it('Card', () => {
    renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
      isFavorite
    />);
    const name = screen.getByTestId('pokemon-name');
    const type = screen.getByTestId('pokemon-type');
    const weight = screen.getByTestId('pokemon-weight');
    const imgAlt = `${pokemons[0].name} sprite`;
    const image = screen.getByAltText(imgAlt);
    expect(name.textContent).toBe(pokemons[0].name);
    expect(type.textContent).toBe(pokemons[0].type);
    const { value, measurementUnit } = pokemons[0].averageWeight;
    const weightString = `Average weight: ${value} ${measurementUnit}`;
    expect(weight.textContent).toBe(weightString);
    expect(image.src).toBe(pokemons[0].image);
  });

  it('Detalhes', () => {
    const { history } = renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
      isFavorite
    />);
    const link = screen.getAllByRole('link', { name: /More details/i });
    userEvent.click(link[0]);
    const { location: { pathname } } = history;
    expect(pathname).toBe(`/pokemons/${pokemons[0].id}`);
  });

  it('Favoritos', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite />);
    const favorite = screen.getByAltText(`${pokemons[0].name} is marked as favorite`);
    expect(favorite.src).toBe('http://localhost/star-icon.svg');
  });
});
