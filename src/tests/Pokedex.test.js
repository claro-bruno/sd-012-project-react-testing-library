import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testa o component Pokedex', () => {
  beforeEach(() => renderWithRouter(<App />));

  test('Testa se existe um heading "Encountered pokémons" na tela', () => {
    const headingH2 = screen.getByRole('heading', { name: /Encountered pokémons/i, level: 2 });
    expect(headingH2).toBeDefined();
  });

  test('Testa se é exibido o próximo Pokémon da lista', () => {
    const btnNextPk = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(btnNextPk).toBeDefined();

    // obs: peguei o primeiro pokemon antes de fazer o loop, sendo assim quando terminar o loop sua posição tem que ser a primeira novamente...
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
    // filtro de valor repetido dentro de array, retirado do site "https://pt.stackoverflow.com/questions/16483/remover-elementos-repetido-dentro-de-um-array-em-javascript"
    const types = typesPk.filter((type, i) => typesPk.indexOf(type) === i);

    const allBtn = screen.getByRole('button', { name: /All/i });
    expect(allBtn).toBeDefined();
    types.forEach((type) => {
      expect(allBtn).toBeDefined();
      const btnType = screen.getByRole('button', { name: type });
      expect(btnType).toBeDefined();
      userEvent.click(btnType);
    });
    userEvent.click(allBtn);
    expect(screen.getByText(`${pokemons[0].name}`)).toBeDefined();
  });
});
