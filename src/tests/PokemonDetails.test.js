import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import renderWithRouter from './helper/renderWithRouter';

let history;

describe('Verificar todo o component PokemonDetails', () => {
  beforeEach(() => {
    ({ history } = renderWithRouter(<App />));
  });

  function testPokemon(title, link) {
    userEvent.click(screen.getByRole('link', { name: 'More details' }));
    expect(history.location.pathname).toBe(link);

    expect(
      screen.getByRole('heading', { name: `${title} Details` }),
    ).toBeDefined();
    expect(screen.queryByRole('link', { name: 'More details' })).toBeNull();
    expect(screen.getByRole('heading', { name: 'Summary', level: 2 }));
    expect(
      screen.getByText(
        'This intelligent Pokémon roasts hard berries'
          + ' with electricity to make them tender enough to eat.',
      ),
    ).toBeDefined();

    expect(
      screen.getByRole('heading', { name: `Game Locations of ${title}` }),
    ).toBeDefined();
    expect(
      screen.getAllByRole('img', { name: `${title} location` }),
    ).toHaveLength(2);
    expect(screen.getAllByText(/^Kanto.+/)).toHaveLength(2);
    expect(
      screen.getAllByRole('img', { name: `${title} location` }),
    ).toHaveLength(2);

    const checkbox = screen.getByLabelText('Pokémon favoritado?');
    userEvent.click(checkbox);
    expect(
      screen.getByRole('img', { name: `${title} is marked as favorite` }).src,
    ).toMatch(/\/star-icon\.svg$/);
  }

  it('Teste a tela de PokemonDetails', () => {
    testPokemon('Pikachu', '/pokemons/25');
  });
});
