import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Verifica Pokedex.js', () => {
  it('Testa renderização do h2', () => {
    renderWithRouter(<App />);

    const subtitle = screen.getByRole('heading', { name: /Encountered pokémons/i });
    expect(subtitle).toBeDefined();

    const btnNext = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(btnNext).toBeDefined();

    const pikachu = screen.getByText('Pikachu');
    expect(pikachu).toBeDefined();

    userEvent.click(btnNext);
    const charmander = screen.getByText('Charmander');
    expect(charmander).toBeDefined();
    const NUMBER = 8;
    for (let index = 1; index < NUMBER; index += 1) {
      userEvent.click(btnNext);
    }
    const dragonair = screen.getByText('Dragonair');
    expect(dragonair).toBeDefined();
    userEvent.click(btnNext);
    expect(pikachu).toBeDefined();

    expect(screen.getByText('All')).toBeDefined();
    expect(screen.getByRole('button', { name: /electric/i })).toBeDefined();
    expect(screen.getByText('Fire')).toBeDefined();
    expect(screen.getByText('Bug')).toBeDefined();
    expect(screen.getByText('Poison')).toBeDefined();
    expect(screen.getByText('Psychic')).toBeDefined();
    expect(screen.getByText('Normal')).toBeDefined();
    expect(screen.getByText('Dragon')).toBeDefined();

    const btnAll = screen.getByRole('button', { name: /All/i });
    userEvent.click(btnAll);
    expect(btnAll).toHaveTextContent('All');
  });
});
