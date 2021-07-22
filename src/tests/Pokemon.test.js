import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pokemon from '../components/Pokemon';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente Pokemon.js', () => {
  const pokemon = {
    id: 4,
    name: 'Charmander',
    type: 'Fire',
    averageWeight: {
      value: '8.5',
      measurementUnit: 'kg',
    },
    image: 'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png',
  };

  it('Teste se é renderizado um card com informações do pokemon', () => {
    const isFavorite = true;
    const { history } = renderWithRouter(<Pokemon
      pokemon={ pokemon }
      isFavorite={ isFavorite }
    />);
    const { averageWeight, id, image, name, type } = pokemon;
    const { measurementUnit, value } = averageWeight;
    expect(screen.getByTestId('pokemon-name')).toHaveTextContent(name);
    expect(screen.getByTestId('pokemon-type')).toHaveTextContent(type);
    expect(screen.getByTestId('pokemon-weight'))
      .toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);
    expect(screen.getByAltText(`${name} sprite`)).toHaveProperty('src', image);
    const link = screen.getByRole('link');
    expect(link.href).toContain(`/pokemons/${id}`);
    userEvent.click(link);
    expect(history.location.pathname).toBe(`/pokemons/${id}`);
    expect(screen.getByAltText(`${name} is marked as favorite`)).toHaveProperty('src', 'http://localhost/star-icon.svg');
  });
});
