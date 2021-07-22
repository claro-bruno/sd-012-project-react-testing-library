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

  it('É exibido o próximo Pokémon quando o botão "Próximo pokémon" é clicado',
    () => {
      const button = screen.getByRole('button', { name: /Próximo pokémon/ });
      const firstPoke = pokemons[0].name;
      for (let index = 0; index < pokemons.length; index += 1) {
        expect(screen.getByText(`${pokemons[index].name}`))
          .toBeDefined();
        userEvent.click(button);
        if (index === pokemons.length - 1) {
          expect(screen.getByText(`${firstPoke}`))
            .toBeDefined();
        }
      }
    });

  it('Existe todos os botões de filter por "Type"', () => {
    const types = pokemons.map((pokemon) => pokemon.type);
    const allTypes = [...types, 'All'];
    allTypes.forEach((type) => expect(screen
      .getByRole('button', { name: `${type}` })).toBeDefined());
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
      for (let index = 0; index < filterPoke.length; index += 1) {
        expect(screen.getByText(`${filterPoke[index].name}`))
          .toBeDefined();
        userEvent.click(button);
        if (index === filterPoke.length - 1) {
          expect(screen.getByText(`${firstPoke}`))
            .toBeDefined();
        }
      }
    });
  });
});
