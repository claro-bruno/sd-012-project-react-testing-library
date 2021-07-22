import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testa Pokedex.js', () => {
  beforeEach(() => renderWithRouter(<App />));

  it('Existe um h2 com o texto "Encountered pokémons"', () => {
    const title = screen.getByRole('heading', { name: /Encountered pokémons/, level: 2 });
    expect(title).toBeDefined();
  });

  it('É renderizado o próximo Pokémon quando o botão "Próximo pokémon" é clicado',
    () => {
      const button = screen.getByRole('button', { name: /Próximo pokémon/ });
      const firstPoke = pokemons[0].name;

      pokemons.forEach((pokemon, index) => {
        const { name } = pokemon;

        const pokemonName = screen.getByText(`${name}`);
        expect(pokemonName).toBeDefined();

        userEvent.click(button);

        if (index === pokemons.length - 1) {
          const firstPokemon = screen.getByText(`${firstPoke}`);
          expect(firstPokemon).toBeDefined();
        }
      });
    });

  it('Existe todos os botões de filter por "Type"', () => {
    const types = pokemons.map((pokemon) => pokemon.type);
    const allTypes = [...types, 'All'];
    const numberButtonsFilter = 7;

    allTypes.forEach((type) => (
      expect(screen.getByRole('button', { name: `${type}` })).toBeDefined()));

    expect(screen.getAllByTestId('pokemon-type-button')).toBeDefined();
    expect(screen.getAllByTestId('pokemon-type-button').length).toBe(numberButtonsFilter);
  });

  it('Testa todos os botões de filter', () => {
    const button = screen.getByRole('button', { name: /Próximo pokémon/ });
    const types = pokemons.map((pokemon) => pokemon.type);
    const allTypes = [...types, 'All'];

    allTypes.forEach((type) => {
      userEvent.click(screen.getByRole('button', { name: `${type}` }));

      let filterPoke = [];

      if (type !== 'All') {
        filterPoke = pokemons.filter((pokemon) => pokemon.type === type);
      } else {
        filterPoke = pokemons;
      }

      const firstPoke = filterPoke[0].name;

      filterPoke.forEach((poke, index) => {
        const { name } = poke;

        expect(screen.getByText(`${name}`)).toBeDefined();

        userEvent.click(button);

        if (index === filterPoke.length - 1) {
          expect(screen.getByText(`${firstPoke}`)).toBeDefined();
        }
      });
    });
  });
});
