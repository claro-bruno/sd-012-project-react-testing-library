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

  function testPokemon(title, type, weight, link) {
    const pokemonTitle = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const pokemonLink = screen.getByRole('link', { name: 'More details' });
    const pokemonImg = screen.getByRole('img', { name: `${title} sprite` });

    expect(pokemonTitle).toHaveTextContent(title);
    expect(pokemonType).toHaveTextContent(type);
    expect(pokemonWeight).toHaveTextContent(`Average weight: ${weight} kg`);
    expect(pokemonLink.href).toMatch(RegExp(`${link}$`));
    expect(pokemonImg.src).toMatch(/\.png$/);

    userEvent.click(pokemonLink);
    expect(history.location.pathname).toBe(link);

    userEvent.click(screen.getByRole('checkbox'));
    expect(screen.getByRole('img', { name: `${title} is marked as favorite` }).src)
      .toMatch(/\/star-icon\.svg$/);
  }

  it('Teste se é renderizado um card com as informações de determinado pokémon.', () => {
    testPokemon('Pikachu', 'Electric', '6.0', '/pokemons/25');
  });
});
