import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import renderWithRouter from './helper/renderWithRouter';

let history;

describe('Verificar todo o component pokemon', () => {
  beforeEach(() => {
    ({ history } = renderWithRouter(<App />));
  });

  function testPokemon(title, link) {
    userEvent.click(pokemonLink);
    expect(history.location.pathname).toBe(link);

    expect(
      screen.getByRole('heading', { name: `${title} Details` }),
    ).toBeDefined();
    expect(screen.getByRole('link', { name: 'More details' })).toThrow();
    expect(screen.getByRole('heading', { name: 'Summary', level: 2 }));

    expect(
      screen.getByRole('heading', { name: `Game Locations of ${title}` }),
    ).toBeDefined();
    expect(
      screen.getAllByRole('img', { name: `${title} location` }),
    ).toHaveLength(2);
    expect(screen.getAllByText('Kanto')).toHaveLength(2);
  }

  it('Teste a tela de PokemonDetails', () => {
    testPokemon('Pikachu', '/pokemons/25');
  });
});
