import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemon from '../data';

// Consulta para entender o requisito ao repositório da colega Renata Nunes:
// https://github.com/tryber/sd-012-project-react-testing-library/pull/135

describe('Testa componente Pokedex', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  test('Testa h2', () => {
    const text = screen.getByRole('heading', { name: /encountered pokémons/i });
    expect(text).toBeDefined();
  });

  test('Testa botão e pasagem de pokémons', () => {
    const card = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(card).toBeDefined();

    pokemon.forEach((pok) => {
      const nextPokemon = screen.getByText(pok.name);
      expect(nextPokemon).toBeDefined();
      userEvent.click(card);
    });

    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeDefined();
  });

  test('Testa se somente um card é mostrado por vez', () => {
    const card = screen.getAllByTestId(/pokemon-name/i);
    expect(card.length).toBe(1);
  });

  test('Testa botões de filtro', () => {
    const numberOfButtons = 7;
    const buttons = screen.getAllByTestId(/pokemon-type-button/i);
    expect(buttons.length).toBe(numberOfButtons);

    const all = screen.getByText(/all/i);
    expect(all).toBeDefined();
  });

  test('Testa botão de resetar', () => {
    const reset = screen.getByRole('button', { name: /all/i });
    userEvent.click(reset);
    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeDefined();
  });
});
