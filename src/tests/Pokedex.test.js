import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import data from '../data';

describe('test pokedex', () => {
  beforeEach(() => renderWithRouter(<App />));
  const typeOfPokemon = 'pokemon-type-button';
  it('H2', () => {
    const H2 = screen.getByText(/Encountered pokémons/i);
    expect(H2.tagName).toBe('H2');
  });

  it('next pokemon', () => {
    screen.getByTestId('pokemon-name');
    const btt = screen.getByRole('button', { name: /Próximo pokémon/i });
    data.forEach((item) => {
      screen.getByText(item.name);
      userEvent.click(btt);
    });
    screen.getByText(data[0].name);
  });

  it('one pokemon', () => {
    const pokemon = screen.getAllByTestId('pokemon-name');
    expect(pokemon).toHaveLength(1);
  });

  it('test button filter', () => {
    const buttons = screen.getAllByTestId(typeOfPokemon);
    buttons.forEach((bttn) => {
      screen.getByRole('button', { name: /all/i });
      const poktype = bttn.textContent;
      userEvent.click(bttn);
      const pokemon = screen.getByTestId('pokemon-type');
      expect(poktype).toBe(pokemon.textContent);
    });
  });

  it('if havent repet button', () => {
    const buttons = screen.getAllByTestId(typeOfPokemon);
    let repet = 0;
    buttons.forEach((bttn) => {
      repet = buttons.filter((button) => bttn.textContent === button.textContent).length;
      expect(repet).toBe(1);
    });
  });

  it('test no filter', () => {
    screen.getByText(data[0].name);
    const bttnAll = screen.getByRole('button', { name: /all/i });
    const buttons = screen.getAllByTestId(typeOfPokemon);
    buttons.forEach((bttn) => {
      userEvent.click(bttn);
      userEvent.click(bttnAll);
      expect(bttnAll).toBeDefined();
    });
  });
});
