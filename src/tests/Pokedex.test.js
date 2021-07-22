import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderwithRouter';
import Data from '../data';

describe('Testing component Pokedex.js', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  it('the page contain a "h2" with text "Encountered pokémons"', () => {
    const heading = screen.getByRole('heading', { name: /encountered pokémons/i });
    expect(heading).toBeInTheDocument();
  });

  it('show the next pokemon in the list when click in "Próximo pokémon"', () => {
    Data.map(({ name }) => {
      const buttonToNext = screen.getByRole('button', { name: /próximo pokémon/i });
      const cardPokemon = screen.getByText(name);
      expect(cardPokemon).toBeInTheDocument();
      return userEvent.click(buttonToNext);
    });
    const firstPokemon = screen.getByText(/pikachu/i);
    expect(firstPokemon).toBeInTheDocument();
  });

  it('showed only one pokemon at a time', () => {
    const onlyOnePokemon = screen.getAllByTestId(/pokemon-name/i);
    expect(onlyOnePokemon).toHaveLength(1);
  });

  it('Pokédex have filters buttons', () => {
    Data.map(({ type }) => {
      const typeFilter = screen.getByRole('button', { name: type });
      return expect(typeFilter).toBeInTheDocument();
    });
    const buttonReset = screen.getByRole('button', { name: /all/i });
    expect(buttonReset).toBeInTheDocument();
  });

  it('Check if there is a button to reset the filter', () => {
    const buttonReset = screen.getByRole('button', { name: /all/i });
    expect(buttonReset).toBeInTheDocument();
    expect(buttonReset).toHaveTextContent(/all/i);
    userEvent.click(buttonReset);

    const getPokemon = screen.getByText(/pikachu/i);
    expect(getPokemon).toBeInTheDocument();
  });
});
