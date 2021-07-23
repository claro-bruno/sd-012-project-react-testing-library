import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import data from '../data';
import App from '../App';

const pokemons = data;

describe('Testa o componente Pokedex', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });
  test('The page displays the correct heading', () => {
    const h2 = screen.getByRole('heading', { name: /Encountered pokémons/i });
    expect(h2).toBeInTheDocument();
  });
  test('Next pokemon is shown after clicking on Next button', () => {
    const nextButton = screen.getByRole('button', { name: /Próximo pokémon/i });

    pokemons.forEach((_pokemon, index) => {
      userEvent.click(nextButton);
      index += 1;
      if ((index < pokemons.length)) {
        const nextName = pokemons[index].name;
        expect(screen.getByText(nextName)).toBeInTheDocument();
      }
      if ((index) > pokemons.length) {
        index = 0;
      }
    });
  });
  test('Renders only one pokemon', () => {
    const img = screen.getAllByRole('img');
    expect(img.length).toBe(1);
  });
  test('Display one filter button for each Pokemon type', () => {
    const types = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    types.forEach((type) => {
      const buttonType = screen.getByRole('button', { name: type });
      expect(buttonType).toBeInTheDocument();
      userEvent.click(buttonType);
      expect(screen.getByTestId('pokemon-type').innerHTML).toBe(type);
    });
  });
  test('Have a button to reset filters', () => {
    const allButton = screen.getByRole('button', { name: 'All' });
    expect(allButton).toBeInTheDocument();
    userEvent.click(allButton);
    expect(screen.getByTestId('pokemon-type').innerHTML).toBe('Electric');
  });
});
