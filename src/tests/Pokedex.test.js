import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Pokedex from '../components/Pokedex';
import pokemon from '../data';

describe('Testa componente Pokedex', () => {
  beforeEach(() => {
    renderWithRouter(<Pokedex pokemons={ pokemon } isPokemonFavoriteById />);
  });

  test('Testa h2', () => {
    const text = screen.getByRole('heading', { name: /encountered pokémons/i });
    expect(text).toBeDefined();
  });

  test('Testa botão e pasagem de pokémons', () => {
    const card = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(card).toBeDefined();

    userEvent.click(card);
    const charmander = screen.getByText(/charmander/i);
    expect(charmander).toBeDefined();

    userEvent.click(card);
    const caterpie = screen.getByText(/caterpie/i);
    expect(caterpie).toBeDefined();

    userEvent.click(card);
    const ekans = screen.getByText(/ekans/i);
    expect(ekans).toBeDefined();

    userEvent.click(card);
    const alakazam = screen.getByText(/alakazam/i);
    expect(alakazam).toBeDefined();

    userEvent.click(card);
    const mew = screen.getByText(/mew/i);
    expect(mew).toBeDefined();

    userEvent.click(card);
    const rapidash = screen.getByText(/rapidash/i);
    expect(rapidash).toBeDefined();

    userEvent.click(card);
    const snorlax = screen.getByText(/snorlax/i);
    expect(snorlax).toBeDefined();

    userEvent.click(card);
    const dragonair = screen.getByText(/dragonair/i);
    expect(dragonair).toBeDefined();

    userEvent.click(card);
    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeDefined();
  });

  test('Testa se somente um card é mostrado por vez', () => {
    const card = screen.getAllByTestId(/pokemon-name/i);
    expect(card.length).toBe(1);
  });

  test('Testa botões de filtro', () => {
    const all = screen.getByRole('button', { name: /all/i });
    expect(all).toBeDefined();

    const electric = screen.getByRole('button', { name: /electric/i });
    expect(electric).toBeDefined();
    userEvent.click(electric);
    const buttonNext = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(buttonNext).toBeDisabled();

    const fire = screen.getByRole('button', { name: /fire/i });
    expect(fire).toBeDefined();
    userEvent.click(fire);
    const charmander = screen.getByText(/charmander/i);
    expect(charmander).toBeDefined();
    userEvent.click(buttonNext);
    const rapidash = screen.getByText(/rapidash/i);
    expect(rapidash).toBeDefined();

    const bug = screen.getByRole('button', { name: /bug/i });
    userEvent.click(bug);
    expect(bug).toBeDefined();
    expect(buttonNext).toBeDisabled();

    const poison = screen.getByRole('button', { name: /poison/i });
    userEvent.click(poison);
    expect(poison).toBeDefined();
    expect(buttonNext).toBeDisabled();

    const psychic = screen.getByRole('button', { name: /psychic/i });
    expect(psychic).toBeDefined();
    userEvent.click(psychic);
    const alakazam = screen.getByText(/alakazam/i);
    expect(alakazam).toBeDefined();
    userEvent.click(buttonNext);
    const mew = screen.getByText(/mew/i);
    expect(mew).toBeDefined();

    const normal = screen.getByRole('button', { name: /normal/i });
    userEvent.click(normal);
    expect(normal).toBeDefined();
    expect(buttonNext).toBeDisabled();

    const dragon = screen.getByRole('button', { name: /dragon/i });
    userEvent.click(dragon);
    expect(dragon).toBeDefined();
    expect(buttonNext).toBeDisabled();
  });

  test('Testa botão de resetar', () => {
    const reset = screen.getByRole('button', { name: /all/i });
    userEvent.click(reset);
    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeDefined();
  });
});
