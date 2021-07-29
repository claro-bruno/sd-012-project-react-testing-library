import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import pokemons from '../data';
import renderWhithRouter from './renderWhithRouter.test';

describe('Teste o componente Pokédex', () => {
  beforeEach(() => {
    renderWhithRouter(<App />);
  });

  test('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    const title = screen.getByRole('heading', { name: /Encountered pokémons/i });
    expect(title).toBeInTheDocument();
  });

  test('É exibido o prox Pokémon da lista quando o btn Próximo pokémon é clicado', () => {
    const btn = screen.getByRole('button', { name: /Próximo pokémon/i });
    pokemons.forEach((next) => {
      const pokemon = screen.getByText(next.name);
      expect(pokemon).toBeDefined();
      userEvent.click(btn);
    });
    const nextPokemon = screen.getByText(pokemons[0].name);
    expect(nextPokemon).toBeInTheDocument();
  });

  test('Teste se é mostrado apenas um Pokémon por vez', () => {
    const btnFilter = screen.getByTestId('pokemon-name');
    expect(btnFilter).toBeInTheDocument();
  });

  test('Teste se a Pokédex tem os botões de filtro', () => {
    const btnReset = screen.getAllByTestId('pokemon-type-button');
    expect(btnReset).toBeDefined();
    btnReset.forEach((pokemon) => {
      const checkButton = screen.getByRole('button', { name: pokemon.textContent });
      userEvent.click(checkButton);
      const checkType = screen.getByTestId('pokemon-type');
      expect(checkButton).toHaveTextContent(checkType.textContent);
      const nextpok = screen.getByTestId('next-pokemon');
      userEvent.click(nextpok);
    });
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    const btnReset = screen.getByRole('button', { name: /All/i });
    expect(btnReset).toBeDefined();
    userEvent.click(btnReset);
    const buttonAll = screen.getByRole('button', { name: /Próximo pokémon/i });
    pokemons.forEach((next) => {
      const pokemon = screen.getByText(next.name);
      expect(pokemon).toBeDefined();
      userEvent.click(buttonAll);
    });
    const checkfirstPkm = screen.getByText(pokemons[0].name);
    expect(checkfirstPkm).toBeDefined();
  });
});
