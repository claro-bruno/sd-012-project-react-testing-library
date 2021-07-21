import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import renderWithRouter from './helper/renderWithRouter';

describe('Verificar toda a pokédex', () => {
  beforeEach(() => renderWithRouter(<App />));

  const TYPES = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
  const POKES = [
    ['Pikachu', 'Electric', '6.0'],
    ['Charmander', 'Fire', '8.5'],
    ['Caterpie', 'Bug', '2.9'],
    ['Ekans', 'Poison', '6.9'],
    ['Alakazam', 'Psychic', '48.0'],
    ['Mew', 'Psychic', '4.0'],
    ['Rapidash', 'Fire', '95.0'],
    ['Snorlax', 'Normal', '460.0'],
    ['Dragonair', 'Dragon', '16.5'],
  ];

  function nextPokemon() {
    const button = screen.getByTestId('next-pokemon');
    expect(button).toHaveTextContent('Próximo pokémon');
    userEvent.click(button);
  }

  function testPokemon(title, type, weight, next = true) {
    const pokemonTitle = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');

    expect(pokemonTitle).toHaveTextContent(title);
    expect(pokemonType).toHaveTextContent(type);
    expect(pokemonWeight).toHaveTextContent(weight);
    if (next) nextPokemon();
  }

  it('Teste se página contém um heading h2 com o texto "Encountered pokémons".', () => {
    const h2 = screen.getByRole('heading', {
      name: 'Encountered pokémons',
      level: 2,
    });
    expect(h2).toBeDefined();
  });

  it('Teste se o botão "Próximo pokémon" funciona', () => {
    POKES.forEach((pokemon) => testPokemon(...pokemon));
    testPokemon(...POKES[0]);
  });

  it('Teste se a Pokédex tem os botões de filtro', () => {
    const filters = screen.getAllByTestId('pokemon-type-button');
    filters.forEach((filter, i) => {
      const TYPE = TYPES[i];
      const pokeFilter = POKES.filter((poke) => poke[1] === TYPE);

      userEvent.click(filter);
      pokeFilter.forEach((poke) => testPokemon(...poke));

      expect(filter).toHaveTextContent(TYPE);
      expect(screen.getByRole('button', { name: 'All' })).toBeDefined();
    });
  });

  it('Teste se a Pokédex contém um botão para redefinir o filtro', () => {
    const fire = screen.getByRole('button', { name: 'Fire' });
    const all = screen.getByRole('button', { name: 'All' });
    testPokemon(...POKES[0], false);
    userEvent.click(fire);
    POKES.filter((poke) => poke[1] === 'Fire').forEach((poke) => {
      testPokemon(...poke);
    });
    userEvent.click(all);
    POKES.forEach((pokemon) => testPokemon(...pokemon));
  });
});
