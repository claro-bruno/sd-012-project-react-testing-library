import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testa o component Pokedex', () => {
  beforeEach(() => renderWithRouter(<App />));

  test('Testa se existe um heading "Encountered pokémons" na tela', () => {
    const h2 = screen.getByRole('heading', { name: /Encountered pokémons/i, level: 2 });
    expect(h2).toBeDefined();
  });

  test('Testa se é exibido o próximo Pokémon da lista', () => {
    const btnNextPk = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(btnNextPk).toBeDefined();

    const firstPk = pokemons[0].name;
    pokemons.forEach((pk) => {
      expect(screen.getByText(`${pk.name}`)).toBeDefined();
      userEvent.click(btnNextPk);
    });
    expect(screen.getByText(`${firstPk}`)).toBeDefined();
  });

  test('Testa se é mostrado apena 1 pokemon por vez', () => {
    const pokemon = screen.getAllByTestId('pokemon-name');
    expect(pokemon.length).toBe(1);
  });

  test('Testa se a Pokédex pussui os botões de filtro', () => {
    const typesPk = pokemons.map((pk) => pk.type);
    const types = typesPk.filter((type, i) => typesPk.indexOf(type) === i);

    const allBtn = screen.getByRole('button', { name: /All/i });
    expect(allBtn).toBeDefined();
    const btnType = screen.getAllByTestId('pokemon-type-button');
    expect(btnType).toBeDefined();
    types.forEach((type) => {
      expect(allBtn).toBeDefined();
      const btnTypePk = screen.getByRole('button', { name: type });
      expect(btnTypePk).toBeDefined();
      userEvent.click(btnTypePk);
    });
    userEvent.click(allBtn);
    expect(screen.getByText(`${pokemons[0].name}`)).toBeDefined();
  });
});
