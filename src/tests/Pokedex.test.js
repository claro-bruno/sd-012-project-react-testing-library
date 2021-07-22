import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWhitRouter from './renderWhithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testa o componente Pokedex', () => {
  beforeEach(() => {
    renderWhitRouter(<App />);
  });

  test('Testa se existe na página um h2 com o texto Encountered pokémons', () => {
    const checkh2 = screen.getByRole('heading', { name: /Encountered pokémons/i });
    expect(checkh2).toBeDefined();
  });

  test('Testa se é exibido o próximo Pokémon quando o botão é clicado', () => {
    const checkBtn = screen.getByRole('button', { name: /Próximo pokémon/i });
    pokemons.forEach((cur) => {
      const pokemon = screen.getByText(cur.name);
      expect(pokemon).toBeDefined();
      userEvent.click(checkBtn);
    });
    const checkfirstPkm = screen.getByText(pokemons[0].name);
    expect(checkfirstPkm).toBeDefined();
  });

  test('Testa se é mostrado apenas um Pokémon por vez', () => {
    const checkOnlyPkm = screen.getByTestId('pokemon-name');
    expect(checkOnlyPkm).toBeDefined();
  });

  test('Testa se a Pokédex tem os botões de filtro', () => {
    const checkBtns = screen.getAllByTestId('pokemon-type-button');
    expect(checkBtns).toBeDefined();
    checkBtns.forEach((cur) => {
      const checkBtn = screen.getByRole('button', { name: cur.textContent });
      userEvent.click(checkBtn);
      const checkType = screen.getByTestId('pokemon-type');
      expect(checkBtn).toHaveTextContent(checkType.textContent);
      const nextpokemon = screen.getByTestId('next-pokemon');
      userEvent.click(nextpokemon);
    });
  });

  test('Testa se a Pokédex contém um botão para resetar o filtro', () => {
    const checkAllBtn = screen.getByRole('button', { name: /All/i });
    expect(checkAllBtn).toBeDefined();
    userEvent.click(checkAllBtn);

    const checkBtn = screen.getByRole('button', { name: /Próximo pokémon/i });
    pokemons.forEach((current) => {
      const pokemon = screen.getByText(current.name);
      expect(pokemon).toBeDefined();
      userEvent.click(checkBtn);
    });
    const checkfirstPkm = screen.getByText(pokemons[0].name);
    expect(checkfirstPkm).toBeDefined();
  });
});
