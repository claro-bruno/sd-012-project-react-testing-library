import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
// import Pokedex from '../components/Pokedex';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

describe('testa Pokedex', () => {
  // beforeEach(() => renderWithRouter(<App />));
  it('testa h2', () => {
    renderWithRouter(<App />);
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading.innerHTML).toBe('Encountered pokémons');
  });
  it('testa o botao de proximo pokemon', () => {
    renderWithRouter(<App />);
    const button = screen.getByRole('button', { name: 'Próximo pokémon' });
    expect(button).toBeInTheDocument();
    pokemons.forEach((e) => {
      const poke = screen.getByTestId('pokemon-name');
      expect(poke.textContent).toBe(e.name);
      userEvent.click(button);
    });
  });
  it('testa se aparece só um pokemon', () => {
    renderWithRouter(<App />);
    const poke = screen.getAllByTestId('pokemon-name');
    expect(poke.length).toBe(1);
    expect(poke[0]).toBeInTheDocument();
  });
  it('um botao para cada tipo', () => {
    renderWithRouter(<App />);
    const filt = [...new Set(pokemons.reduce((types, { type }) => [...types, type], []))];
    filt.forEach((e, i) => {
      const butons = screen.getAllByTestId('pokemon-type-button')[i];
      expect(butons.textContent).toBe(e);
      userEvent.click(butons);
      const nButton = screen.getByRole('button', { name: 'Próximo pokémon' });
      const pokeType = screen.getByTestId('pokemon-type');
      userEvent.click(nButton);
      expect(pokeType.textContent).toBe(e);
      expect(pokeType).toBeInTheDocument();
    });
  });
  it('all tenque estar no doc', () => {
    renderWithRouter(<App />);
    const allButton = screen.getByRole('button', { name: 'All' });
    userEvent.click(allButton);
    expect(allButton).toBeInTheDocument();
    const poke = screen.getByText('Pikachu');
    expect(poke.textContent).toBe('Pikachu');
  });
});
